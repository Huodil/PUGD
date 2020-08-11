package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"log"
)

var MediaType = graphql.NewObject(graphql.ObjectConfig{
	Name: "MediaType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Source.(*AdministrationModels.MediaTypes).ID.Hex(), nil
			},
		},
		"media_types_name": &graphql.Field{
			Type: graphql.String,
		},
		"dure_pret": &graphql.Field{
			Type: graphql.Int,
		},
		"dure_reservation": &graphql.Field{
			Type: graphql.Int,
		},
		"international_code": &graphql.Field{
			Type: graphql.String,
		},
		"owner": &graphql.Field{
			Type: OwnerType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id := p.Source.(*AdministrationModels.MediaTypes).OwenId
				log.Println("id : ", id)
				owner, _ := (&AdministrationModels.Owner{}).FindOne(id)
				return owner, nil
			},
		},
	},
})
