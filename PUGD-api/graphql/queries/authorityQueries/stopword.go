package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetStopword = &graphql.Field{
	Type: graphql.NewList(authorityTypes.StopwordType),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		filter := bson.M{}

		if p.Args["id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["id"].(string)); err == nil {
				filter["_id"] = id
			} else {
				return nil, err
			}
		}

		if word, wordOK := p.Args["word"].(string); wordOK {
			filter["word"] = primitive.Regex{Pattern: word, Options: ""}
		}
		if stopwordType, stopwordTypeOK := p.Args["type"].(int); stopwordTypeOK {
			filter["type"] = stopwordType
		}

		return (&authorityModels.Stopword{}).FindMultiple(filter)
	},
}
