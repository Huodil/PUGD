package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"regexp"
)

var GetUniformTitles = &graphql.Field{
	Type: graphql.NewList(authorityTypes.UniformTitleTypeAuthorities),
	Args: graphql.FieldConfigArgument{
		"UniformTitle": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(authorityTypes.UniformTitleQueryInputType),
		},

	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		inputObject := p.Args["UniformTitle"].(map[string]interface{})

		if name, nameOk := inputObject["name"].(string); nameOk {
			inputObject["name"] = primitive.Regex{Pattern: regexp.QuoteMeta(name), Options: ""}
		}
		if idHex, idHexOk := inputObject["_id"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			inputObject["_id"] = id
		}
		log.Println(inputObject)
		return (&authorityModels.UniformTitle{}).FindMultiple(inputObject)
	},
}
