package mutations

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneBook = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection(os.Getenv(db.CollectionBook))

		isbn := p.Args["isbn"]
		title := p.Args["title"]

		if isbn == nil {
			isbn = ""
		}
		if title == nil {
			title = ""
		}

		book := models.Book{
			ISBN:  isbn.(string),
			Title: title.(string),
		}
		result, err2 := coll.InsertOne(ctx, book)
		if err2 != nil {
			log.Fatal(err2)
		}
		fmt.Println(result.InsertedID.(primitive.ObjectID))
		return result.InsertedID.(primitive.ObjectID), nil

	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneBook = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
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
		coll := models.DB.Collection(os.Getenv(db.CollectionBook))
		// id := p.Args["id"]
		isbn := p.Args["isbn"]
		title := p.Args["title"]

		// _id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))

		// if err != nil {
		// 	return nil, err
		// }
		bookUpdate := bson.M{}

		// if id != nil {
		// 	bookUpdate["id"] = id
		// }
		if isbn != nil {
			bookUpdate["isbn"] = isbn
		}
		if title != nil {
			bookUpdate["title"] = title
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"isbn": isbn},

			bson.M{
				"$set": bookUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneBook = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.CollectionBook))

		// _id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		// if err != nil {
		// 	return nil, err
		// }
		isbn := p.Args["isbn"]

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"isbn": isbn})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
