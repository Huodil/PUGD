package AdministrationMutations

import (
	"context"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/db"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneMediaType = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"media_types_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"dure_pret": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"dure_reservation": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"OwenId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		mediatypes := AdministrationModels.MediaTypes{}

		if name := p.Args["media_types_name"]; name != nil {
			mediatypes.Name = name.(string)
		}
		if name := p.Args["international_code"]; name != nil {
			mediatypes.InternationalCode = name.(string)
		}

		if DurePret := p.Args["dure_pret"]; DurePret != nil {
			mediatypes.DurePret = DurePret.(int)
		}
		if DureReservation := p.Args["dure_reservation"]; DureReservation != nil {
			mediatypes.DureReservation = DureReservation.(int)
		}

		if OwenerID := p.Args["OwenId"]; OwenerID != nil {

			OwenPremitiveID, err2 := primitive.ObjectIDFromHex(OwenerID.(string))
			if err2 != nil {
				return nil, err2
			}
			mediatypes.OwenId = OwenPremitiveID
		}

		mediatypesExists := mediatypes.Find()
		if mediatypesExists != nil {
			return nil, errors.New("media types already exists")
		}

		lastId, errInsert := mediatypes.Store()
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

var UpdateOneMediaType = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"media_types_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"dure_pret": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"dure_reservation": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"OwenId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		media := AdministrationModels.MediaTypes{}
		MediaUpdate := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		if name := p.Args["media_types_name"]; name != nil {
			MediaUpdate["media_types_name"] = name.(string)
		}
		if DatePret := p.Args["dure_pret"]; DatePret != nil {
			MediaUpdate["dure_pret"] = DatePret.(int)
		}
		if DateResv := p.Args["dure_reservation"]; DateResv != nil {
			MediaUpdate["dure_reservation"] = DateResv.(int)
		}
		if InternationalCode := p.Args["international_code"]; InternationalCode != nil {
			MediaUpdate["international_code"] = InternationalCode.(string)
		}
		if InternationalCode := p.Args["international_code"]; InternationalCode != nil {
			MediaUpdate["international_code"] = InternationalCode.(string)
		}

		if p.Args["OwenId"] != nil {
			OwenId, err2 := primitive.ObjectIDFromHex(p.Args["OwenId"].(string))
			if err2 != nil {
				return nil, err2
			}
			MediaUpdate["OwenId"] = OwenId
		}
		media.ID = _id
		return media.Update(MediaUpdate)

	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneMediaType = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.MediaTypes))

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
