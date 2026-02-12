package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/internal/auth/controllers"
	"github.com/risk-based-audit/backend/pkg/middleware"
)

// RegisterAuthRoutes registers auth routes
func RegisterAuthRoutes(router *gin.Engine, authCtrl controllers.AuthControllerInterface, authMiddleware *middleware.AuthMiddleware) {
	auth := router.Group("/api/v1/auth")
	{
		auth.POST("/login", authCtrl.Login)
		auth.POST("/register", authCtrl.Register)

		// Protected routes
		protected := auth.Group("")
		protected.Use(authMiddleware.Authenticate())
		{
			protected.POST("/logout", authCtrl.Logout)
			protected.POST("/change-password", authCtrl.ChangePassword)
			protected.GET("/me", authCtrl.Me)
		}
	}
}

// RegisterUserRoutes registers user routes
func RegisterUserRoutes(router *gin.Engine, userCtrl controllers.UserControllerInterface, authMiddleware *middleware.AuthMiddleware) {
	users := router.Group("/api/v1/users")
	users.Use(authMiddleware.Authenticate())
	{
		users.POST("", userCtrl.CreateUser)
		users.GET("", userCtrl.ListUsers)
		users.GET("/:id", userCtrl.GetUser)
		users.PUT("/:id", userCtrl.UpdateUser)
		users.DELETE("/:id", userCtrl.DeleteUser)
	}
}
