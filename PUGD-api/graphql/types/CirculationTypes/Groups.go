package CirculationTypes

import (
	"github.com/graphql-go/graphql"
)

var GroupsType = graphql.NewObject(graphql.ObjectConfig{
	Name: "GroupsType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"responsable": &graphql.Field{
			Type: BorrowerType,
		},
		"add_responsable_to_group":            &graphql.Field{Type: graphql.Boolean},
		"letter_rappel":                       &graphql.Field{Type: graphql.Boolean},
		"mail_reservation":                    &graphql.Field{Type: graphql.Boolean},
		"mail_rappel":                         &graphql.Field{Type: graphql.Boolean},
		"letter_reservation":                  &graphql.Field{Type: graphql.Boolean},
		"imprime_name_one_letter":             &graphql.Field{Type: graphql.Boolean},
		"imprime_name_one_letter_reservation": &graphql.Field{Type: graphql.Boolean},
		"created_at":                          &graphql.Field{Type: graphql.DateTime},
		"members": &graphql.Field{
			Type: graphql.NewList(BorrowerType),
		},
	},
})
var ListGroupType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ListGroupType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"group": &graphql.Field{
			Type: graphql.String,
		},
		"responsable": &graphql.Field{
			Type: BorrowerType,
		},
		"membersCount":       &graphql.Field{Type: graphql.Int},
		"currentLoan":        &graphql.Field{Type: graphql.Int},
		"currentReservation": &graphql.Field{Type: graphql.Int},
	},
})
