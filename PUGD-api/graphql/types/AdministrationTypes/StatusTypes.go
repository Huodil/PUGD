package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var StatusType = graphql.NewObject(graphql.ObjectConfig{
	Name: "StatusType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*AdministrationModels.Status).ID.Hex())
				log.Print("____> id ", id.Hex())
				return id.Hex(), nil
			},
		},
		"status_name": &graphql.Field{
			Type: graphql.String,
		},
		"label_opac": &graphql.Field{
			Type: graphql.String,
		},
		"can_borrowed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"can_reserved": &graphql.Field{
			Type: graphql.Boolean,
		},
		"visible_in_opac": &graphql.Field{
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
