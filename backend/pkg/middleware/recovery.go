package middleware

import (
	"fmt"
	"net/http"
	"runtime/debug"
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/pkg/logger"
	"github.com/risk-based-audit/backend/pkg/response"
	"go.uber.org/zap"
)

// RecoveryMiddleware recovers from panics
func RecoveryMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if err := recover(); err != nil {
				// Log the panic
				logger.Error("Panic recovered",
					zap.Any("error", err),
					zap.String("stack", string(debug.Stack())),
				)

				// Return internal server error
				response.InternalServerError(c, "Internal server error")
				c.Abort()
			}
		}()

		c.Next()
	}
}
