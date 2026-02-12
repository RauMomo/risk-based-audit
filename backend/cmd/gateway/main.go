package main

import (
	"context"
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"os/signal"
	"syscall"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/pkg/config"
	"github.com/risk-based-audit/backend/pkg/logger"
	"github.com/risk-based-audit/backend/pkg/middleware"
)

func main() {
	// Load configuration
	cfg, err := config.Load("./configs/config.yaml")
	if err != nil {
		panic(fmt.Sprintf("Failed to load config: %v", err))
	}

	// Initialize logger
	if err := logger.Init(&cfg.Log); err != nil {
		panic(fmt.Sprintf("Failed to initialize logger: %v", err))
	}
	defer logger.Sync()

	logger.Info("Starting API Gateway", logger.LogField("port", cfg.Server.Port))

	// Create Gin engine
	if cfg.Server.Mode == "release" {
		gin.SetMode(gin.ReleaseMode)
	}
	engine := gin.New()

	// Apply global middleware
	engine.Use(middleware.RecoveryMiddleware())
	engine.Use(middleware.LoggerMiddleware())
	engine.Use(middleware.CORSMiddleware())

	// Service URLs (could be from config or service discovery)
	services := map[string]string{
		"auth":     "http://auth-service:8001",
		"audit":    "http://audit-service:8002",
		"risk":     "http://risk-service:8003",
		"dashboard": "http://dashboard-service:8004",
	}

	// Create reverse proxy for each service
	for serviceName, serviceURL := range services {
		createReverseProxy(engine, serviceName, serviceURL)
	}

	// Health check endpoint
	engine.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "gateway",
		})
	})

	// Create HTTP server
	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Server.Port),
		Handler:      engine,
		ReadTimeout:  time.Duration(cfg.Server.ReadTimeout) * time.Second,
		WriteTimeout: time.Duration(cfg.Server.ReadTimeout) * time.Second,
	}

	// Start server in a goroutine
	go func() {
		logger.Info("API Gateway started", logger.LogField("addr", srv.Addr))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", logger.LogField("error", err))
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down API Gateway...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", logger.LogField("error", err))
	}

	logger.Info("API Gateway exited")
}

// createReverseProxy creates a reverse proxy handler for a service
func createReverseProxy(engine *gin.Engine, serviceName, serviceURL string) {
	target, err := url.Parse(serviceURL)
	if err != nil {
		logger.Fatal("Failed to parse service URL",
			logger.LogField("service", serviceName),
			logger.LogField("url", serviceURL),
			logger.LogField("error", err))
	}

	proxy := httputil.NewSingleHostReverseProxy(target)

	// Custom error handler
	proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
		logger.Error("Proxy error",
			logger.LogField("service", serviceName),
			logger.LogField("error", err))
		w.WriteHeader(http.StatusBadGateway)
		w.Write([]byte(fmt.Sprintf(`{"success":false,"error":{"code":"SERVICE_UNAVAILABLE","message":"%s service unavailable"}}`, serviceName)))
	}

	// Register route for this service
	engine.Any("/api/v1/"+serviceName+"/*path", gin.WrapH(proxy))

	logger.Info("Registered service proxy",
		logger.LogField("service", serviceName),
		logger.LogField("path", "/api/v1/"+serviceName),
		logger.LogField("target", serviceURL))
}
