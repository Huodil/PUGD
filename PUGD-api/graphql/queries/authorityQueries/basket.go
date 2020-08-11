package authorityQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var GetBaskets = &graphql.Field{
	Type: graphql.NewList(authorityTypes.BasketType),
	Args: graphql.FieldConfigArgument{
		"basket": &graphql.ArgumentConfig{
			Type: authorityTypes.BasketInputType,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		log.Println("---------------------------------------")
		var inputObject = map[string]interface{}{}
		if p.Args["basket"] != nil {
			inputObject = p.Args["basket"].(map[string]interface{})
		}
		if idHex, idHexOk := inputObject["_id"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			inputObject["_id"] = id
		}

		//fmt.Println(inputObject)
		return (&authorityModels.Basket{}).FindMultiple(inputObject)

	},
}
