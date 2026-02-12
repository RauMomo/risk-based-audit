package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/internal/auth/registry"
	"github.com/risk-based-audit/backend/pkg/config"
	"github.com/risk-based-audit/backend/pkg/database"
	"github.com/risk-based-audit/backend/pkg/logger"
	"github.com/risk-based-audit/backend/pkg/middleware"
	"github.com/risk-based-audit/backend/pkg/redis"
	"github.com/risk-based-audit/backend/pkg/validations"
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

	logger.Info("Starting Auth Service", logger.LogField("port", cfg.Server.Port), logger.LogField("service", "auth"))

	// Connect to database
	db, err := database.NewPostgresConnection(&cfg.Database)
	if err != nil {
		logger.Fatal("Failed to connect to database", logger.LogField("error", err))
	}

	// Connect to Redis
	rdb, err := redis.NewRedisConnection(&cfg.Redis)
	if err != nil {
		logger.Fatal("Failed to connect to redis", logger.LogField("error", err))
	}

	// Initialize validator
	validator := validations.New()

	// Create Gin engine
	if cfg.Server.Mode == "release" {
		gin.SetMode(gin.ReleaseMode)
	}
	engine := gin.New()

	// Apply global middleware
	engine.Use(middleware.RecoveryMiddleware())
	engine.Use(middleware.LoggerMiddleware())
	engine.Use(middleware.CORSMiddleware())

	// Initialize registry and register routes
	reg := registry.NewRegistry(cfg, db, rdb, validator, engine)
	reg.RegisterRoutes()

	// Health check endpoint
	engine.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
			"service": "auth",
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
		logger.Info("Auth Service started", logger.LogField("addr", srv.Addr))
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Fatal("Failed to start server", logger.LogField("error", err))
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	logger.Info("Shutting down Auth Service...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Error("Server forced to shutdown", logger.LogField("error", err))
	}

	logger.Info("Auth Service exited")
}
