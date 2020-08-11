package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAllMediaTypes = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.MediaType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		mediaType := AdministrationModels.MediaTypes{}
		FindAll := bson.M{}
		return mediaType.FindAllOrBy(FindAll)
	},
}

var GetOneMediaTypes = &graphql.Field{
	Type: AdministrationTypes.MediaType,
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
		return (&AdministrationModels.MediaTypes{}).FindMediaTypeByID(_id)
	},
}
