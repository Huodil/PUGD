package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var OwnerType = graphql.NewObject(graphql.ObjectConfig{
	Name: "OwnerType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*AdministrationModels.Owner).ID.Hex())
				return id.Hex(), nil
			},
		},
		"owner_name": &graphql.Field{
			Type: graphql.String,
		},
	},
})
