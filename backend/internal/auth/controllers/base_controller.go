package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/risk-based-audit/backend/pkg/response"
	"github.com/risk-based-audit/backend/pkg/validations"
)

// BaseController provides common controller operations
type BaseController struct {
	validator *validations.Validator
}

// NewBaseController creates a new base controller
func NewBaseController(validator *validations.Validator) *BaseController {
	return &BaseController{
		validator: validator,
	}
}

// ValidateRequest validates a request struct
func (c *BaseController) ValidateRequest(ctx *gin.Context, req interface{}) bool {
	if err := ctx.ShouldBindJSON(req); err != nil {
		response.BadRequest(ctx, err.Error())
		return false
	}

	if err := c.validator.Validate(req); err != nil {
		response.BadRequest(ctx, err.Error())
		return false
	}

	return true
}

// ValidateQuery validates a query struct
func (c *BaseController) ValidateQuery(ctx *gin.Context, req interface{}) bool {
	if err := ctx.ShouldBindQuery(req); err != nil {
		response.BadRequest(ctx, err.Error())
		return false
	}

	if err := c.validator.Validate(req); err != nil {
		response.BadRequest(ctx, err.Error())
		return false
	}

	return true
}

// GetUserID retrieves user_id from context
func (c *BaseController) GetUserID(ctx *gin.Context) string {
	if userID, exists := ctx.Get("user_id"); exists {
		if id, ok := userID.(string); ok {
			return id
		}
	}
	return ""
}

// GetUsername retrieves username from context
func (c *BaseController) GetUsername(ctx *gin.Context) string {
	if username, exists := ctx.Get("username"); exists {
		if name, ok := username.(string); ok {
			return name
		}
	}
	return ""
}

// GetRoles retrieves roles from context
func (c *BaseController) GetRoles(ctx *gin.Context) []string {
	if roles, exists := ctx.Get("roles"); exists {
		if r, ok := roles.([]string); ok {
			return r
		}
	}
	return []string{}
}
