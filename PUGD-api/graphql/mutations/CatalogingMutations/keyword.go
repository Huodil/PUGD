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

var InsertOneKeyWord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Lang": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("keywords")

		Word := p.Args["Word"]
		Lang := p.Args["Lang"]

		if Word == nil {
			Word = ""
		}
		if Lang == nil {
			Lang = ""
		}

		var s = CatalogingModel.Keyword{
			Word: Word.(string),
			Lang: Lang.(string),
		}
		result, err2 := coll.InsertOne(ctx, s)
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

var UpdateOneKeyWord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Lang": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("keywords")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Word := p.Args["Word"]
		Lang := p.Args["Lang"]

		KeyWordUpdate := bson.M{}

		if Word != nil {
			KeyWordUpdate["word"] = Word
		}
		if Lang != nil {
			KeyWordUpdate["lang"] = Lang
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": KeyWordUpdate,
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
var DeleteOneKeyWord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("keywords")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		keyWord, ero := utils.SearchKeyWord(_id)
		if ero != nil {
			log.Print("no doc ")
		}
		//remove the id of the branch from from the records
		for i := 0; i < len(keyWord.Records); i++ {
			record, _ := CatalogingModel.FindRecordByID(keyWord.Records[i])
			if record != nil {
				k := utils.DeleteFromSliceOfIds(_id, record.KeyWords)
				_ = utils.UpdateRecordIDs(keyWord.Records[i], "keywords", k)
			}

		}
		//remove the id of the branch from from the serials
		for i := 0; i < len(keyWord.Serials); i++ {
			serial, _ := CatalogingModel.FindSerialByID(keyWord.Serials[i])
			if serial != nil {
				s := utils.DeleteFromSliceOfIds(_id, serial.Branches)
				_ = utils.UpdateSerialIDs(keyWord.Serials[i], "keywords", s)
			}
		}
		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
