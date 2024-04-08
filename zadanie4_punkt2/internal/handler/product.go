package handler

import (
	"PROBA/internal/model"
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func ListProducts(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var products []model.Product
		if result := db.Find(&products); result.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}
		return c.JSON(http.StatusOK, products)
	}
}

func CreateProduct(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		var product model.Product
		if err := c.Bind(&product); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
		}
		if result := db.Create(&product); result.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}
		return c.JSON(http.StatusCreated, product)
	}
}

func GetProduct(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		var product model.Product
		if result := db.First(&product, id); result.Error != nil {
			if errors.Is(result.Error, gorm.ErrRecordNotFound) {
				return echo.NewHTTPError(http.StatusNotFound, "Product not found")
			}
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}
		return c.JSON(http.StatusOK, product)
	}
}

func UpdateProduct(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		var product model.Product
		if result := db.First(&product, id); result.Error != nil {
			if errors.Is(result.Error, gorm.ErrRecordNotFound) {
				return echo.NewHTTPError(http.StatusNotFound, "Product not found")
			}
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}

		var updateData model.Product
		if err := c.Bind(&updateData); err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
		}

		product.Name = updateData.Name
		product.Price = updateData.Price
		db.Save(&product)

		return c.JSON(http.StatusOK, product)
	}
}

func DeleteProduct(db *gorm.DB) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := c.Param("id")
		var product model.Product
		if result := db.Delete(&product, id); result.Error != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, result.Error.Error())
		}
		return c.NoContent(http.StatusNoContent)
	}
}
