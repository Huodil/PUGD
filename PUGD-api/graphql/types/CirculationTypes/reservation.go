package CirculationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var ValidReservation = graphql.NewObject(graphql.ObjectConfig{
	Name: "ValidReservation",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"borrower": &graphql.Field{
			Type: BorrowerType,
		},
		"lastLoan": &graphql.Field{
			Type: BorrowerType,
		},
		"copy": &graphql.Field{
			Type: CatalogingTypes.CopyType,
		},
		"confirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"isChecked": &graphql.Field{
			Type: graphql.Boolean,
		},
		"date_reservation": &graphql.Field{
			Type: graphql.DateTime,
		},
		"rank": &graphql.Field{
			Type: graphql.Int,
		},
	},
})

var ReservationType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ReservationType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"borrower": &graphql.Field{
			Type: BorrowerType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Reservation).Idborrower.Hex())
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
		"copy": &graphql.Field{
			Type: CatalogingTypes.CopyType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Reservation).IdCopy.Hex())
				log.Print("==>> ", id)
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
		"confirmed": &graphql.Field{
			Type: graphql.Boolean,
		},
		"date_reservation": &graphql.Field{
			Type: graphql.DateTime,
		},
		"rank": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
