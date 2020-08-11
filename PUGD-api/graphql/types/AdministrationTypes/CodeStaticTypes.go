package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var CodeStaticType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CodeStaticType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*AdministrationModels.CodeStatic).ID.Hex())
				log.Print("____> id ", id.Hex())
				return id.Hex(), nil
			},
		},
		"static_name": &graphql.Field{
			Type: graphql.String,
		},
	},
})
