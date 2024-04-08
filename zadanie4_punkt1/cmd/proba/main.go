package main

import (
	"PROBA/internal/handler"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/products", handler.ListProducts)
	e.POST("/products", handler.CreateProduct)
	e.GET("/products/:id", handler.GetProduct)
	e.PUT("/products/:id", handler.UpdateProduct)
	e.DELETE("/products/:id", handler.DeleteProduct)

	e.Logger.Fatal(e.Start(":8080"))
}
