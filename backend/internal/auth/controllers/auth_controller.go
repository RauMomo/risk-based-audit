package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/risk-based-audit/backend/internal/auth/models"
	"github.com/risk-based-audit/backend/internal/auth/services"
	apperrors "github.com/risk-based-audit/backend/pkg/errors"
	"github.com/risk-based-audit/backend/pkg/response"
	"github.com/risk-based-audit/backend/pkg/validations"
)

// AuthControllerInterface defines the auth controller interface
type AuthControllerInterface interface {
	Login(c *gin.Context)
	Register(c *gin.Context)
	Logout(c *gin.Context)
	ChangePassword(c *gin.Context)
	Me(c *gin.Context)
}

// AuthController handles auth HTTP requests
type AuthController struct {
	*BaseController
	authService services.AuthServiceInterface
}

// NewAuthController creates a new auth controller
func NewAuthController(
	validator *validations.Validator,
	authService services.AuthServiceInterface,
) AuthControllerInterface {
	return &AuthController{
		BaseController: NewBaseController(validator),
		authService:    authService,
	}
}

// Login handles user login
// @Summary Login
// @Description Authenticate a user
// @Tags auth
// @Accept json
// @Produce json
// @Param request body models.LoginRequest true "Login request"
// @Success 200 {object} response.Response{data=models.LoginResponse}
// @Router /api/v1/auth/login [post]
func (ctrl *AuthController) Login(c *gin.Context) {
	var req models.LoginRequest
	if !ctrl.ValidateRequest(c, &req) {
		return
	}

	result, err := ctrl.authService.Login(c.Request.Context(), &req)
	if err != nil {
		appErr, ok := err.(*apperrors.AppError)
		if ok {
			response.Error(c, appErr.StatusCode, appErr.Code, appErr.Message, "")
		} else {
			response.InternalServerError(c, err.Error())
		}
		return
	}

	response.OK(c, "Login successful", result)
}

// Register handles user registration
// @Summary Register
// @Description Register a new user
// @Tags auth
// @Accept json
// @Produce json
// @Param request body models.RegisterRequest true "Register request"
// @Success 201 {object} response.Response
// @Router /api/v1/auth/register [post]
func (ctrl *AuthController) Register(c *gin.Context) {
	var req models.RegisterRequest
	if !ctrl.ValidateRequest(c, &req) {
		return
	}

	if err := ctrl.authService.Register(c.Request.Context(), &req); err != nil {
		appErr, ok := err.(*apperrors.AppError)
		if ok {
			response.Error(c, appErr.StatusCode, appErr.Code, appErr.Message, "")
		} else {
			response.InternalServerError(c, err.Error())
		}
		return
	}

	response.Created(c, "Registration successful", nil)
}

// Logout handles user logout
// @Summary Logout
// @Description Logout a user
// @Tags auth
// @Accept json
// @Produce json
// @Security Bearer
// @Success 200 {object} response.Response
// @Router /api/v1/auth/logout [post]
func (ctrl *AuthController) Logout(c *gin.Context) {
	token := c.GetHeader("Authorization")
	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:]
	}

	if err := ctrl.authService.Logout(c.Request.Context(), token); err != nil {
		response.InternalServerError(c, err.Error())
		return
	}

	response.OK(c, "Logout successful", nil)
}

// ChangePassword handles password change
// @Summary Change Password
// @Description Change user password
// @Tags auth
// @Accept json
// @Produce json
// @Security Bearer
// @Param request body models.ChangePasswordRequest true "Change password request"
// @Success 200 {object} response.Response
// @Router /api/v1/auth/change-password [post]
func (ctrl *AuthController) ChangePassword(c *gin.Context) {
	var req models.ChangePasswordRequest
	if !ctrl.ValidateRequest(c, &req) {
		return
	}

	userIDStr := ctrl.GetUserID(c)
	userID, err := uuid.Parse(userIDStr)
	if err != nil {
		response.BadRequest(c, "Invalid user ID")
		return
	}

	if err := ctrl.authService.ChangePassword(c.Request.Context(), userID, &req); err != nil {
		appErr, ok := err.(*apperrors.AppError)
		if ok {
			response.Error(c, appErr.StatusCode, appErr.Code, appErr.Message, "")
		} else {
			response.InternalServerError(c, err.Error())
		}
		return
	}

	response.OK(c, "Password changed successfully", nil)
}

// Me returns the current user info
// @Summary Get Current User
// @Description Get current user information
// @Tags auth
// @Produce json
// @Security Bearer
// @Success 200 {object} response.Response{data=models.UserInfo}
// @Router /api/v1/auth/me [get]
func (ctrl *AuthController) Me(c *gin.Context) {
	_ = ctrl.GetUserID(c)

	// Get token from header
	token := c.GetHeader("Authorization")
	if len(token) > 7 && token[:7] == "Bearer " {
		token = token[7:]
	}

	claims, err := ctrl.authService.ValidateToken(token)
	if err != nil {
		response.Unauthorized(c, "Invalid token")
		return
	}

	response.OK(c, "User retrieved successfully", models.UserInfo{
		ID:        claims.UserID,
		Username:  claims.Username,
		Roles:     claims.Roles,
	})
}
