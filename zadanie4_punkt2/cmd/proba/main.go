package main

import (
	"PROBA/internal/handler"
	"PROBA/internal/model"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

func initDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("products.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err := db.AutoMigrate(&model.Product{}); err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}

	var count int64
	db.Model(&model.Product{}).Count(&count)
	if count == 0 {
		db.Create(&model.Product{Name: "Klawiatura", Price: 99.99})
		db.Create(&model.Product{Name: "Mysz", Price: 49.99})
	}

	return db
}

func main() {
	e := echo.New()

	db := initDB()

	e.GET("/products", handler.ListProducts(db))
	e.POST("/products", handler.CreateProduct(db))
	e.GET("/products/:id", handler.GetProduct(db))
	e.PUT("/products/:id", handler.UpdateProduct(db))
	e.DELETE("/products/:id", handler.DeleteProduct(db))

	e.Logger.Fatal(e.Start(":8080"))
}
