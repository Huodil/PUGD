package authoritiesMutations

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

var InsertStopword = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		stopword := authorityModels.Stopword{
		}
		if word, wordOK := p.Args["word"].(string); wordOK {
			stopword.Word = word
		}
		if stopwordType, stopwordTypeOK := p.Args["type"].(int); stopwordTypeOK {
			stopword.Type = stopwordType
		}
		return stopword.Store()
	},
}

var UpdateStopword = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}

		stopword := authorityModels.Stopword{
		}
		StopwordUpdate := bson.M{}

		stopword.Id = _id

		if word, wordOK := p.Args["word"].(string); wordOK {

			StopwordUpdate["word"] = word
		}
		if stopwordType, stopwordTypeOK := p.Args["type"].(int); stopwordTypeOK {
			StopwordUpdate["type"] = stopwordType
		}
		return stopword.Update(StopwordUpdate)

	},
}

var DeleteStopword = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("stopword")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			return nil, err
		}

		return resultDelete.DeletedCount, nil

	},
}
