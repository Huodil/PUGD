package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAllStatus = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.StatusType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		status := AdministrationModels.Status{}
		FindAll := bson.M{}
		return status.FindAllOrBy(FindAll)
	},
}
var GetOneStatus = &graphql.Field{
	Type: AdministrationTypes.StatusType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		return (&AdministrationModels.Status{}).FindStatusByID(_id)
	},
}
