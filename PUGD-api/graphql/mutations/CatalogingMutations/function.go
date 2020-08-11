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

var InsertOneFunction = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Value": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Number": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("functions")

		Value := p.Args["Value"]
		Number := p.Args["Number"]

		if Value == nil {
			Value = ""
		}
		if Number == nil {
			Number = 0
		}

		var l = CatalogingModel.Function{
			Value:  Value.(string),
			Number: Number.(int),
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

var UpdateOneFunction = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Value": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Number": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("functions")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Value := p.Args["Value"]
		Number := p.Args["Number"]

		FunctionUpdate := bson.M{}

		if Value != nil {
			FunctionUpdate["value"] = Value
		}
		if Number != nil {
			FunctionUpdate["number"] = Number
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": FunctionUpdate,
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
var DeleteOneFunction = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("functions")

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
