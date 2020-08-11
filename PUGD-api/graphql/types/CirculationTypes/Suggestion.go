package CirculationTypes

import "github.com/graphql-go/graphql"

var SuggestionType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SuggestionType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"SuggestionBy": &graphql.Field{
			Type: graphql.String,
		},
		"Ponderation": &graphql.Field{
			Type: graphql.Float,
		},
		"Etat": &graphql.Field{
			Type: graphql.Boolean,
		},
		"Quantite": &graphql.Field{
			Type: graphql.Int,
		},
		"TitreOrDescriptionFile": &graphql.Field{
			Type: graphql.String,
		},
		"Editeur": &graphql.Field{
			Type: graphql.String,
		},
		"Auteur": &graphql.Field{
			Type: graphql.String,
		},
		"ISBN": &graphql.Field{
			Type: graphql.String,
		},
		"Prix": &graphql.Field{
			Type: graphql.Float,
		},
		"URLAssocier": &graphql.Field{
			Type: graphql.String,
		},
		"Commentaires": &graphql.Field{
			Type: graphql.String,
		},
		"CommentairesGestion": &graphql.Field{
			Type: graphql.String,
		},
		"DateDePublication": &graphql.Field{
			Type: graphql.DateTime,
		},
		"DateCreationSugg": &graphql.Field{
			Type: graphql.DateTime,
		},
		"PieceJointe": &graphql.Field{
			Type: graphql.String,
		},
	},
})
