package queries

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var BookQuery = &graphql.Field{
	Type: types.BookType,
	Args: graphql.FieldConfigArgument{
		"title": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		book := &models.Book{}

		filter := bson.M{}

		title := p.Args["title"].(string)

		filter["title"] = title

		models.DB.Collection("books").FindOne(ctx, filter).Decode(book)

		return book, graphql.Boolean.Error()
	},
}

// usage
// query{
// 	books{
// 	  _id
// 	  isbn
// 	  title
// 	}
// }

//Params are optional
var GetAllBooks = &graphql.Field{
	Type: graphql.NewList(types.BookType),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//Authorisation

		// Get the context from the params
		cont := p.Context.Value("cont").(*gin.Context)
		// Validate the token
		claims, err := utils.Authorize(cont)
		// If the token is not valid
		if err != nil {
			cont.AbortWithStatus(http.StatusUnauthorized)
			return nil, err
		}

		fmt.Println(claims.Id)
		id := p.Args["id"]
		isbn := p.Args["isbn"]
		title := p.Args["title"]
		filter := bson.M{}

		if id != nil {
			filter["_id"] = id
		}
		if isbn != nil {
			filter["isbn"] = isbn
		}
		if title != nil {
			filter["title"] = title
		}

		coll := models.DB.Collection("books")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*models.Book

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
