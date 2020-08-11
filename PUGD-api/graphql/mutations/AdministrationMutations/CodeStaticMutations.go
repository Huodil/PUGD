package AdministrationMutations

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
)

var InsertOneCodeStatic = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"static_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		codeStatic := AdministrationModels.CodeStatic{}

		if name := p.Args["static_name"]; name != nil {
			codeStatic.Name = name.(string)
		}
		codeStaticExists := codeStatic.Find()
		if codeStaticExists != nil {
			return nil, errors.New("status Borrowerd already exists")
		}

		lastId, errInsert := codeStatic.Store()
		if errInsert != nil {
			return nil, errInsert
		}
		return lastId.Hex(), nil

	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneCodeStatic = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"static_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		codeStaticUpdate := bson.M{}
		codeStatic := AdministrationModels.CodeStatic{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id status to HEX")
		}
		codeStatic.ID = _id

		if name := p.Args["static_name"]; name != nil {
			codeStaticUpdate["static_name"] = name.(string)
		}
		return codeStatic.Update(codeStaticUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }

var DeleteOneCodeStatic = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.CodeStatic))

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil
	},
}
