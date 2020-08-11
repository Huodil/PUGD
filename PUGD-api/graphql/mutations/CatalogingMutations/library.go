package CatalogingMutations

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneLibrary = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("libraries")

		Name := p.Args["Name"]
		Address := p.Args["Address"]

		if Name == nil {
			Name = ""
		}
		if Address == nil {
			Address = ""
		}

		var l = CatalogingModel.Library{
			Name:    Name.(string),
			Address: Address.(string),
		}
		result, err2 := coll.InsertOne(ctx, l)
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

var UpdateOneLibrary = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Address": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("libraries")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Name := p.Args["Name"]
		Address := p.Args["Address"]

		libraryUpdate := bson.M{}

		if Name != nil {
			libraryUpdate["name"] = Name
		}
		if Address != nil {
			libraryUpdate["address"] = Address
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": libraryUpdate,
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
var DeleteOneLibrary = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("libraries")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
