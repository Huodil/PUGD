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

var InsertOneLanguage = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Value": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("languages")

		Value := p.Args["Value"]

		if Value == nil {
			Value = ""
		}

		var L = CatalogingModel.Language{
			Value: Value.(string),
		}
		result, err2 := coll.InsertOne(ctx, L)
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

var UpdateOneLanguage = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Value": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("languages")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Value := p.Args["Value"]

		LanguageUpdate := bson.M{}
		if Value != nil {
			LanguageUpdate["value"] = Value
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": LanguageUpdate,
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
var DeleteOneLanguage = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("languages")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		language, err := utils.SearchLanguage(_id)
		if err != nil {
			log.Print("no doc ")
		}
		//remove the id of the branch from from the records
		for i := 0; i < len(language.Records); i++ {
			record, _ := CatalogingModel.FindRecordByID(language.Records[i])
			if record != nil {
				l := utils.DeleteFromSliceOfIds(_id, record.Language)
				o := utils.DeleteFromSliceOfIds(_id, record.OriginalLanguage)
				_ = utils.UpdateRecordIDs(language.Records[i], "language", l)
				_ = utils.UpdateRecordIDs(language.Records[i], "originallanguage", o)
			}

		}

		//remove the id of the branch from from the serial
		for i := 0; i < len(language.Serials); i++ {
			serial, _ := CatalogingModel.FindSerialByID(language.Serials[i])
			if serial != nil {
				l := utils.DeleteFromSliceOfIds(_id, serial.Language)
				o := utils.DeleteFromSliceOfIds(_id, serial.OriginalLanguage)
				_ = utils.UpdateSerialIDs(language.Serials[i], "language", l)
				_ = utils.UpdateSerialIDs(language.Serials[i], "originallanguage", o)
			}

		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
