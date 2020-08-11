package CirculationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var CategorieBorrowerType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CategorieBorrowerType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.CategoriesBrrowers).Id.Hex())
				log.Print("==>> ", id.Hex())
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
					return nil, err
				}
				return id.Hex(), nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},

		"dureeadhesion": &graphql.Field{
			Type: graphql.Int,
		},
		"agemin": &graphql.Field{
			Type: graphql.Int,
		},
		"agemax": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
