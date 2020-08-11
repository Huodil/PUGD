package queries

import (
	"errors"

	"github.com/Harmony-Technology/PUGD-api/graphql/types"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"golang.org/x/crypto/bcrypt"
)

var Login = &graphql.Field{
	Type: types.TokenType,
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

		userPassword, err := models.HashPassword([]byte(password))
		if err != nil {
			return nil, err
		}

		userQuery := models.User{
			Username: username,
			Password: userPassword,
		}

		user := userQuery.Find()
		cryptError := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
		if cryptError != nil {
			return nil, cryptError
		}
		jwtObject, errG := utils.JwtGenerateToken(user.Id.Hex())

		if errG != nil {

			return nil, errG
		}

		return jwtObject, nil
	},
}
