package models

// LoginRequest represents a login request
type LoginRequest struct {
	Username string `json:"username" binding:"required" validate:"required,min=3,max=50"`
	Password string `json:"password" binding:"required" validate:"required,min=6"`
}

// RegisterRequest represents a register request
type RegisterRequest struct {
	Username  string `json:"username" binding:"required" validate:"required,min=3,max=50"`
	Email     string `json:"email" binding:"required" validate:"required,email"`
	Password  string `json:"password" binding:"required" validate:"required,min=6"`
	FullName  string `json:"full_name" validate:"max=100"`
	Phone     string `json:"phone" validate:"max=20"`
	Department string `json:"department" validate:"max=100"`
}

// LoginResponse represents a login response
type LoginResponse struct {
	Token     string   `json:"token"`
	ExpiresAt int64    `json:"expires_at"`
	User      UserInfo `json:"user"`
}

// UserInfo represents user information
type UserInfo struct {
	ID        string   `json:"id"`
	Username  string   `json:"username"`
	Email     string   `json:"email"`
	FullName  string   `json:"full_name"`
	Phone     string   `json:"phone"`
	Department string  `json:"department"`
	Roles     []string `json:"roles"`
}

// ChangePasswordRequest represents a change password request
type ChangePasswordRequest struct {
	OldPassword string `json:"old_password" binding:"required" validate:"required"`
	NewPassword string `json:"new_password" binding:"required" validate:"required,min=6"`
}

// CreateUserRequest represents a create user request
type CreateUserRequest struct {
	Username   string   `json:"username" binding:"required" validate:"required,min=3,max=50"`
	Email      string   `json:"email" binding:"required" validate:"required,email"`
	Password   string   `json:"password" binding:"required" validate:"required,min=6"`
	FullName   string   `json:"full_name" validate:"max=100"`
	Phone      string   `json:"phone" validate:"max=20"`
	Department string   `json:"department" validate:"max=100"`
	Roles      []string `json:"roles"`
}

// UpdateUserRequest represents an update user request
type UpdateUserRequest struct {
	FullName   *string  `json:"full_name" validate:"omitempty,max=100"`
	Phone      *string  `json:"phone" validate:"omitempty,max=20"`
	Department *string  `json:"department" validate:"omitempty,max=100"`
	IsActive   *bool    `json:"is_active"`
}

// ListUsersRequest represents a list users request
type ListUsersRequest struct {
	Page      int    `form:"page" validate:"min=1"`
	PageSize  int    `form:"page_size" validate:"min=1,max=100"`
	Search    string `form:"search"`
	Department string `form:"department"`
	IsActive  *bool  `form:"is_active"`
}

// UserResponse represents a user response
type UserResponse struct {
	ID         string  `json:"id"`
	Username   string  `json:"username"`
	Email      string  `json:"email"`
	FullName   string  `json:"full_name"`
	Phone      string  `json:"phone"`
	Department string  `json:"department"`
	IsActive   bool    `json:"is_active"`
	Roles      []string `json:"roles"`
	CreatedAt  string  `json:"created_at"`
	UpdatedAt  string  `json:"updated_at"`
}
