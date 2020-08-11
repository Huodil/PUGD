package CirculationMutation

import (
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

var InsertOneSuggestion = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"SuggestionBy": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Ponderation": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"Etat": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"Quantite": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"TitreOrDescriptionFile": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Editeur": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Auteur": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ISBN": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Prix": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"URLAssocier": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Commentaires": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CommentairesGestion": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"DateDePublication": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"PieceJointe": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		Suggestion := CirculationModel.Suggestion{}
		Suggestion.DateCreationSugg = time.Now()

		if idHex, idHexOk := p.Args["SuggestionBy"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			Suggestion.SuggestionBy = id
		}
		if Ponderation := p.Args["Ponderation"]; Ponderation != nil {
			Suggestion.Ponderation = Ponderation.(float64)
		}
		if Etat := p.Args["Etat"]; Etat != nil {
			Suggestion.Etat = Etat.(bool)
		}
		if Quantite := p.Args["Quantite"]; Quantite != nil {
			Suggestion.Quantite = Quantite.(int)
		}
		if TitreOrDescriptionFile := p.Args["TitreOrDescriptionFile"]; TitreOrDescriptionFile != nil {
			Suggestion.TitreOrDescriptionFile = TitreOrDescriptionFile.(string)
		}
		if Editeur := p.Args["Editeur"]; Editeur != nil {
			Suggestion.Editeur = Editeur.(string)
		}
		if Auteur := p.Args["Auteur"]; Auteur != nil {
			Suggestion.Auteur = Auteur.(string)
		}
		if ISBN := p.Args["ISBN"]; ISBN != nil {
			Suggestion.ISBN = ISBN.(string)
		}
		if Prix := p.Args["Prix"]; Prix != nil {
			Suggestion.Prix = Prix.(float64)
		}
		if URLAssocier := p.Args["URLAssocier"]; URLAssocier != nil {
			Suggestion.URLAssocier = URLAssocier.(string)
		}
		if Commentaires := p.Args["Commentaires"]; Commentaires != nil {
			Suggestion.Commentaires = Commentaires.(string)
		}
		if CommentairesGestion := p.Args["CommentairesGestion"]; CommentairesGestion != nil {
			Suggestion.CommentairesGestion = CommentairesGestion.(string)
		}
		if PieceJointe := p.Args["PieceJointe"]; PieceJointe != nil {
			Suggestion.PieceJointe = PieceJointe.(string)
		}
		if DateDePublication := p.Args["DateDePublication"]; DateDePublication != nil {
			Suggestion.DateDePublication = DateDePublication.(time.Time)
		}

		lastId, errInsert := Suggestion.Store()
		if errInsert != nil {
			return nil, errInsert
		}
		fmt.Println("New Suggestin id ", lastId)
		return lastId.Hex(), nil

	},
}
