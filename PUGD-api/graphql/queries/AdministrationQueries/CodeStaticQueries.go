package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var GetAllCodeStatics = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.CodeStaticType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		codeStatic := AdministrationModels.CodeStatic{}
		FindAll := bson.M{}
		return codeStatic.FindAllOrBy(FindAll)
	},
}

var GetOneCodeStatic = &graphql.Field{
	Type: AdministrationTypes.CodeStaticType,
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
		return (&AdministrationModels.CodeStatic{}).FindStatusByID(_id)
	},
}
