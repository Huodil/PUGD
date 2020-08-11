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

var InsertOneStatus = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"status_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"label_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"visible_in_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},

		"can_borrowed": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"can_reserved": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OwenId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		status := AdministrationModels.Status{}

		if name := p.Args["status_name"]; name != nil {
			status.Name = name.(string)
		}
		if labelopac := p.Args["label_opac"]; labelopac != nil {
			status.LabelOPAC = labelopac.(string)
		}
		if canborrowed := p.Args["can_borrowed"]; canborrowed != nil {
			status.CanBorrowed = canborrowed.(bool)
		}
		if canreserved := p.Args["can_reserved"]; canreserved != nil {
			status.CanReserved = canreserved.(bool)
		}
		if visibleinopac := p.Args["visible_in_opac"]; visibleinopac != nil {
			status.VisibleInOPAC = visibleinopac.(bool)
		}
		if international_code := p.Args["international_code"]; international_code != nil {
			status.InternationalCode = international_code.(string)
		}
		if p.Args["OwenId"] != nil {
			OwenId, err := primitive.ObjectIDFromHex(p.Args["OwenId"].(string))
			if err != nil {
				return nil, errors.New(err.Error())
			}
			status.OwenId = OwenId
		}

		statusExists := status.Find()
		if statusExists != nil {
			return nil, errors.New("status already exists")
		}

		lastId, errInsert := status.Store()
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

var UpdateOneStatus = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"status_name": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"label_opac": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"can_borrowed": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"can_reserved": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"visible_in_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"owen_id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		StatusUpdate := bson.M{}
		status := AdministrationModels.Status{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id status to HEX")
		}
		status.ID = _id

		if p.Args["owen_id"] != nil {
			OwenId, err2 := primitive.ObjectIDFromHex(p.Args["owen_id"].(string))
			if err2 != nil {
				return nil, err2
			}
			StatusUpdate["owen_id"] = OwenId
		}
		if name := p.Args["status_name"]; name != nil {
			StatusUpdate["status_name"] = name.(string)
		}
		if labelOpac := p.Args["label_opac"]; labelOpac != nil {
			StatusUpdate["label_opac"] = labelOpac.(string)
		}
		if canBorrowed := p.Args["can_borrowed"]; canBorrowed != nil {
			StatusUpdate["can_borrowed"] = canBorrowed.(bool)
		}
		if canReserved := p.Args["can_reserved"]; canReserved != nil {
			StatusUpdate["can_reserved"] = canReserved.(bool)
		}
		if visibleInOpac := p.Args["visible_in_opac"]; visibleInOpac != nil {
			StatusUpdate["visible_in_opac"] = visibleInOpac.(bool)
		}
		if internationalCode := p.Args["international_code"]; internationalCode != nil {
			StatusUpdate["international_code"] = internationalCode.(string)
		}
		return status.Update(StatusUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneStatus = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Status))

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
