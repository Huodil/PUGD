package AdministrationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var StatusBorrowersType = graphql.NewObject(graphql.ObjectConfig{
	Name: "StatusBorrowersType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*AdministrationModels.StatusBorrowers).Id.Hex())
				log.Print("____> id ", id.Hex())
				return id.Hex(), nil
			},
		},
		"status_name": &graphql.Field{
			Type: graphql.String,
		},
		"is_autorized_for_borrowerd": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_historique_pret": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_reservation": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_connected_opac": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_dsi_privat": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_sarche": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_access_to_list_borrowerd": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_request_prolongation": &graphql.Field{
			Type: graphql.Boolean,
		},
		"is_autorized_for_changed_password": &graphql.Field{
			Type: graphql.Boolean,
		},
	},
})
