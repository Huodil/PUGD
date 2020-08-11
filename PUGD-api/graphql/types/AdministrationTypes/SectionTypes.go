package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var SectionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SectionType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*AdministrationModels.Section).ID.Hex())
				return id.Hex(), nil
			},
		},
		"section_name": &graphql.Field{
			Type: graphql.String,
		},
		"image": &graphql.Field{
			Type: graphql.String,
		},
		"visible_in_opac": &graphql.Field{
			Type: graphql.Boolean,
		},
		"visible_in_location": &graphql.Field{
			Type: graphql.Boolean,
		},
		"international_code": &graphql.Field{
			Type: graphql.String,
		},
		"owen": &graphql.Field{
			Type: graphql.ID,
		},
	},
})
