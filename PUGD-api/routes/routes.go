package routes

import (
	"fmt"

	"github.com/Harmony-Technology/PUGD-api/graphql"

	"github.com/gin-gonic/gin"
)

func New() {

	router := gin.Default()

	router.Use(CORSMiddleware())
	// router.Use(MyCustomMiddleWare())
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	router.GET("/graphql", graphql.Handler())
	router.POST("/graphql", graphql.Handler())
	router.Run(":9000")

}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Max-Age", "86400")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Origin, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		fmt.Println(c.Request.Method)

		if c.Request.Method == "OPTIONS" {
			fmt.Println("OPTIONS")
			c.AbortWithStatus(200)
		} else {
			c.Next()
		}
	}
}
