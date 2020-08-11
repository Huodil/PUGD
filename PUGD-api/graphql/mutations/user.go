package mutations

import (
	"errors"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
)

var Register = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"username": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"password": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		username := p.Args["username"].(string)
		password := p.Args["password"].(string)

		if username == "" || password == "" {
			return nil, errors.New("please provide valid credentials")
		}

		user := models.User{
			Username: username,
			Password: password,
		}

		userExists := user.Find()
		if userExists != nil {
			return nil, errors.New("user already exists")
		}

		lastId, errInsert := user.Store()
		if errInsert != nil {
			return nil, errInsert
		}

		return lastId.Hex(), nil

	},
}
