package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetSynonym = &graphql.Field{
	Type: graphql.NewList(authorityTypes.SynonymTypeOuput),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"leads_to": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.ID),
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

		if LeadsToList := p.Args["leads_to"]; LeadsToList != nil {
			LeadsToList := p.Args["leads_to"].([]interface{})
			// the resulting array
			var ObjectIdList = []primitive.ObjectID{}

			for i := 0; i < len(LeadsToList); i++ {
				// Convert every string id to an object id
				_id, err := primitive.ObjectIDFromHex(LeadsToList[i].(string))
				if err != nil {
					return nil, err
				}
				ObjectIdList = append(ObjectIdList, _id)
			}
			filter["leads_to"] = ObjectIdList
		}

		return (&authorityModels.Synonym{}).FindMultiple(filter)
	},
}
