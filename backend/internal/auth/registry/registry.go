package registry

import (
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/internal/auth/controllers"
	"github.com/risk-based-audit/backend/internal/auth/repositories"
	"github.com/risk-based-audit/backend/internal/auth/routes"
	"github.com/risk-based-audit/backend/internal/auth/services"
	"github.com/risk-based-audit/backend/pkg/config"
	"github.com/risk-based-audit/backend/pkg/middleware"
	"github.com/risk-based-audit/backend/pkg/redis"
	"github.com/risk-based-audit/backend/pkg/validations"
	"gorm.io/gorm"
)

// Registry holds all dependencies for the auth service
type Registry struct {
	Config     *config.Config
	DB         *gorm.DB
	Redis      *redis.Client
	Validator  *validations.Validator
	GinEngine  *gin.Engine

	// Middleware
	AuthMiddleware *middleware.AuthMiddleware

	// Repositories
	UserRepository repositories.UserRepositoryInterface

	// Services
	AuthService services.AuthServiceInterface
	UserService services.UserServiceInterface

	// Controllers
	AuthController controllers.AuthControllerInterface
	UserController controllers.UserControllerInterface
}

// NewRegistry creates a new registry with all dependencies
func NewRegistry(
	cfg *config.Config,
	db *gorm.DB,
	rdb *redis.Client,
	validator *validations.Validator,
	engine *gin.Engine,
) *Registry {
	r := &Registry{
		Config:    cfg,
		DB:        db,
		Redis:     rdb,
		Validator: validator,
		GinEngine: engine,
	}

	r.initMiddleware()
	r.initRepositories()
	r.initServices()
	r.initControllers()

	return r
}

// initMiddleware initializes all middleware
func (r *Registry) initMiddleware() {
	r.AuthMiddleware = middleware.NewAuthMiddleware(r.Config.JWT.Secret)
}

// initRepositories initializes all repositories
func (r *Registry) initRepositories() {
	baseRepo := repositories.NewBaseRepository(r.DB)
	r.UserRepository = repositories.NewUserRepository(baseRepo)
}

// initServices initializes all services
func (r *Registry) initServices() {
	r.AuthService = services.NewAuthService(r.UserRepository, r.Redis, r.Config)
	r.UserService = services.NewUserService(r.UserRepository)
}

// initControllers initializes all controllers
func (r *Registry) initControllers() {
	r.AuthController = controllers.NewAuthController(r.Validator, r.AuthService)
	r.UserController = controllers.NewUserController(r.Validator, r.UserService)
}

// RegisterRoutes registers all routes
func (r *Registry) RegisterRoutes() {
	routes.RegisterAuthRoutes(r.GinEngine, r.AuthController, r.AuthMiddleware)
	routes.RegisterUserRoutes(r.GinEngine, r.UserController, r.AuthMiddleware)
}
