package repositories

import (
	"github.com/risk-based-audit/backend/pkg/errors"
	"gorm.io/gorm"
)

// BaseRepository provides common database operations
type BaseRepository struct {
	DB *gorm.DB
}

// NewBaseRepository creates a new base repository
func NewBaseRepository(db *gorm.DB) *BaseRepository {
	return &BaseRepository{DB: db}
}

// Create creates a new record
func (r *BaseRepository) Create(entity interface{}) error {
	if err := r.DB.Create(entity).Error; err != nil {
		return errors.Wrap(errors.ErrDatabase.Code, "Failed to create record", errors.ErrDatabase.StatusCode, err)
	}
	return nil
}

// Update updates a record
func (r *BaseRepository) Update(entity interface{}) error {
	if err := r.DB.Save(entity).Error; err != nil {
		return errors.Wrap(errors.ErrDatabase.Code, "Failed to update record", errors.ErrDatabase.StatusCode, err)
	}
	return nil
}

// Delete deletes a record
func (r *BaseRepository) Delete(entity interface{}) error {
	if err := r.DB.Delete(entity).Error; err != nil {
		return errors.Wrap(errors.ErrDatabase.Code, "Failed to delete record", errors.ErrDatabase.StatusCode, err)
	}
	return nil
}

// FindByID finds a record by ID
func (r *BaseRepository) FindByID(entity interface{}, id interface{}) error {
	if err := r.DB.First(entity, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return errors.ErrNotFound
		}
		return errors.Wrap(errors.ErrDatabase.Code, "Failed to find record", errors.ErrDatabase.StatusCode, err)
	}
	return nil
}

// FindMany finds multiple records with pagination
func (r *BaseRepository) FindMany(entities interface{}, offset, limit int) error {
	if err := r.DB.Offset(offset).Limit(limit).Find(entities).Error; err != nil {
		return errors.Wrap(errors.ErrDatabase.Code, "Failed to find records", errors.ErrDatabase.StatusCode, err)
	}
	return nil
}

// Count counts records
func (r *BaseRepository) Count(model interface{}) (int64, error) {
	var count int64
	if err := r.DB.Model(model).Count(&count).Error; err != nil {
		return 0, errors.Wrap(errors.ErrDatabase.Code, "Failed to count records", errors.ErrDatabase.StatusCode, err)
	}
	return count, nil
}

// WithTx starts a transaction
func (r *BaseRepository) WithTx(fn func(tx *gorm.DB) error) error {
	return r.DB.Transaction(fn)
}

// GetDB returns the underlying DB instance
func (r *BaseRepository) GetDB() *gorm.DB {
	return r.DB
}
