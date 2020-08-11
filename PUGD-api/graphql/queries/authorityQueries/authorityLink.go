package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAuthorityLink = &graphql.Field{
	Type: graphql.NewList(authorityTypes.AuthorityLinkType),
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		//"root_authority_type": &graphql.ArgumentConfig{
		//	Type: graphql.String,
		//},
		//"root_authority_id": &graphql.ArgumentConfig{
		//	Type: graphql.ID,
		//},
		//"linked_authority_type": &graphql.ArgumentConfig{
		//	Type: graphql.String,
		//},
		//"linked_authority_id": &graphql.ArgumentConfig{
		//	Type: graphql.ID,
		//},
		//"start": &graphql.ArgumentConfig{
		//	Type: graphql.DateTime,
		//},
		//"end": &graphql.ArgumentConfig{
		//	Type: graphql.DateTime,
		//},
		//"comment": &graphql.ArgumentConfig{
		//	Type: graphql.String,
		//},
		//"linktype": &graphql.ArgumentConfig{
		//	Type: graphql.Int,
		//},
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

		return (&authorityModels.AuthorityLink{}).FindMultiple(filter)

	},
}
