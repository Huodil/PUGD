package AdministrationMutations

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneOwner = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"owner_name": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		owner := AdministrationModels.Owner{}

		if name := p.Args["owner_name"]; name != nil {
			owner.Name = name.(string)
		}

		sectionExists := owner.Find()
		if sectionExists != nil {
			return nil, errors.New("owner already exists Try Other")
		}

		lastId, errInsert := owner.Store()
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

var UpdateOneOwner = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"owner_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		owen := AdministrationModels.Owner{}
		OwenUpdate := bson.M{}
		if name := p.Args["owner_name"]; name != nil {
			OwenUpdate["owner_name"] = name.(string)
		}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id Section to HEX")
		}
		owen.ID = _id
		return owen.Update(OwenUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneOwner = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Owner))

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
