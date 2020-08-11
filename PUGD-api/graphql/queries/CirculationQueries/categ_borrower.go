package CirculationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Get record by _id
var GetOneCategorieBorrower = &graphql.Field{
	Type: CirculationTypes.CategorieBorrowerType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		categorie := CirculationModel.CategoriesBrrowers{}
		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		return categorie.FindOne(_id)
	},
}

//Get All Records
//params are optional
var GetAllCategoriesBorrowers = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.CategorieBorrowerType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		categorie := CirculationModel.CategoriesBrrowers{}
		Filter := bson.M{}
		return categorie.FindAllOrBy(Filter)
	},
}
