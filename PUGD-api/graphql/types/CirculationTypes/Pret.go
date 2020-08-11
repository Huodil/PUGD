package CirculationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var PretType = graphql.NewObject(graphql.ObjectConfig{
	Name: "PretType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"Borrwore": &graphql.Field{
			Type: BorrowerType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Pret).Idborrower.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				respo, ero := (&CirculationModel.Borrower{}).FindOne(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return respo, nil
			},
		},
		"Copy": &graphql.Field{
			Type: CatalogingTypes.CopyType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Pret).IdCopy.Hex())
				log.Print("==>> ", id.Hex())
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				respo, ero := (&CatalogingModel.Copy{}).FindCopyByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return respo, nil
			},
		},
		"is_preted": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_Express": &graphql.Field{
			Type: graphql.Boolean,
		},
		"date_of_loan": &graphql.Field{
			Type: graphql.DateTime,
		},
		"date_init": &graphql.Field{
			Type: graphql.DateTime,
		},
		"date_retour_prev": &graphql.Field{
			Type: graphql.DateTime,
		},
		"prologement": &graphql.Field{
			Type: ProlongementType,
		},
	},
})

var ProlongementType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ProlongementType",
	Fields: graphql.Fields{
		"NombreMax": &graphql.Field{
			Type: graphql.Int,
		},
		"date_prolongement": &graphql.Field{
			Type: graphql.DateTime,
		},
	},
})

var ReturnCopy = graphql.NewObject(graphql.ObjectConfig{
	Name: "ReturnCopy",
	Fields: graphql.Fields{
		"copy": &graphql.Field{
			Type: CatalogingTypes.CopyType,
		},
		"isLoan": &graphql.Field{
			Type: graphql.Boolean,
		},
		"lastLoan": &graphql.Field{
			Type: BorrowerType,
		},
		"nextLoan": &graphql.Field{
			Type: BorrowerType,
		},
	},
})
