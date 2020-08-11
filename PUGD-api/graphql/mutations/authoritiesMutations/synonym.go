package authoritiesMutations

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"time"
)

var InsertSynonym = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"leads_to": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.ID),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		synonym := authorityModels.Synonym{
		}
		if word, wordOK := p.Args["word"].(string); wordOK {
			synonym.Word = word
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
			synonym.Leads_To = ObjectIdList
		}

		return synonym.Store()
	},
}

var UpdateSynonym = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"word": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"leads_to": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.ID),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}

		synonym := authorityModels.Synonym{
		}
		SynonymUpdate := bson.M{}

		synonym.Id = _id

		if word, wordOK := p.Args["word"].(string); wordOK {

			SynonymUpdate["word"] = word
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
			SynonymUpdate["leads_to"] = ObjectIdList
		}
		log.Println(SynonymUpdate)
		return synonym.Update(SynonymUpdate)

	},
}

var DeleteSynonym = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("synonym")

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
