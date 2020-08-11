package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAllStatusBorrowers = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.StatusBorrowersType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		status := AdministrationModels.StatusBorrowers{}
		FindAll := bson.M{}
		return status.FindAllOrBy(FindAll)
	},
}
var GetOneStatusBorrowers = &graphql.Field{
	Type: AdministrationTypes.StatusBorrowersType,
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
		return (&AdministrationModels.StatusBorrowers{}).FindStatusByID(_id)
	},
}
