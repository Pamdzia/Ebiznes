package handler

import (
	"PROBA/internal/model"
	"github.com/labstack/echo/v4"
	"log"
	"net/http"
	"strconv"
)

var products = []model.Product{
	{ID: "1", Name: "Klawiatura", Price: 99.99},
	{ID: "2", Name: "Mysz", Price: 49.99},
}

func CreateProduct(c echo.Context) error {
	p := new(model.Product)
	if err := c.Bind(p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	newID := strconv.Itoa(len(products) + 1)
	p.ID = newID

	products = append(products, *p)

	return c.JSON(http.StatusCreated, p)
}

func ListProducts(c echo.Context) error {
	log.Println("ListProducts called")
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")

	for _, product := range products {
		if product.ID == id {
			return c.JSON(http.StatusOK, product)
		}
	}

	return c.JSON(http.StatusNotFound, "Product not found")
}

func UpdateProduct(c echo.Context) error {
	id := c.Param("id")
	p := new(model.Product)
	if err := c.Bind(p); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid product data")
	}

	for i, product := range products {
		if product.ID == id {
			products[i] = *p
			products[i].ID = id
			return c.JSON(http.StatusOK, products[i])
		}
	}

	return c.JSON(http.StatusNotFound, "Product not found")
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")

	for i, product := range products {
		if product.ID == id {
			products = append(products[:i], products[i+1:]...)
			return c.NoContent(http.StatusNoContent)
		}
	}

	return c.JSON(http.StatusNotFound, "Product not found")
}
