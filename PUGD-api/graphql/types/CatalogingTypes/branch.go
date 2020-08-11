package CatalogingTypes

import (
	"log"

	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var BranchType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BranchType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"BranchName": &graphql.Field{
			Type: graphql.String,
		},
		"BranchZip": &graphql.Field{
			Type: graphql.Int,
		},
		"BranchCity": &graphql.Field{
			Type: graphql.String,
		},
		"BranchState": &graphql.Field{
			Type: graphql.String,
		},
		"BranchCountry": &graphql.Field{
			Type: graphql.String,
		},
		"BranchFax": &graphql.Field{
			Type: graphql.String,
		},
		"BranchPhone": &graphql.Field{
			Type: graphql.String,
		},
		"BranchUrl": &graphql.Field{
			Type: graphql.String,
		},
		"BranchIp": &graphql.Field{
			Type: graphql.String,
		},
		"GeoLocation": &graphql.Field{
			Type: graphql.String,
		},
		"Records": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"Serials": &graphql.Field{
			Type: graphql.NewList(graphql.ID),
		},
		"Library": &graphql.Field{
			Type: LibraryType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Branch).Library.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Library, _ := CatalogingModel.FindLibraryByID(id)
				if Library == nil {

					return nil, nil
				}
				return Library, nil
			},
		},
	},
})
