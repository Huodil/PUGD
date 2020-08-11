package CatalogingMutations

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Records": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("uniformtitles")

		Title := p.Args["Title"]

		if Title == nil {
			Title = ""
		}

		// make an objectID list out of the an argument
		var ObjectIDRecords []primitive.ObjectID
		if p.Args["Records"] != nil {
			ObjectIDRecords = utils.MakeSliceOfIDs(p.Args["Records"].([]interface{}))
		} else {
			ObjectIDRecords = append(ObjectIDRecords, primitive.NilObjectID)
		}

		var u = CatalogingModel.UniformTitle{
			Title:   Title.(string),
			Records: ObjectIDRecords,
		}
		result, err2 := coll.InsertOne(ctx, u)
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

var UpdateOneUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Records": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("uniformtitles")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Title := p.Args["Title"]

		UniformTitleUpdate := bson.M{}

		if Title != nil {
			UniformTitleUpdate["title"] = Title
		}
		// make an objectID list out of the an argument
		var ObjectIDRecords []primitive.ObjectID
		if p.Args["Records"] != nil {
			ObjectIDRecords = utils.MakeSliceOfIDs(p.Args["Records"].([]interface{}))
		} else {
			ObjectIDRecords = append(ObjectIDRecords, primitive.NilObjectID)
		}
		UniformTitleUpdate["Records"] = ObjectIDRecords
		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": UniformTitleUpdate,
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
var DeleteOneUniformTitle = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("uniformtitles")

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
