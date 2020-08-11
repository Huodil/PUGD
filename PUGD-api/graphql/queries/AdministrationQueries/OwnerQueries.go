package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAllOwners = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.OwnerType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		owner := AdministrationModels.Owner{}
		FindAll := bson.M{}
		return owner.FindAllOrBy(FindAll)
	},
}
var GetOneOwner = &graphql.Field{
	Type: AdministrationTypes.OwnerType,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		owner := AdministrationModels.Owner{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		return owner.FindOne(_id)
	},
}
