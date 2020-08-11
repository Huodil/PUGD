package AcquisitionMutations

import             (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Insert new Provider
var InsertProvider = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"account": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"adress": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"phone": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"email": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"website": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("providers")
		establishement := p.Args["establishement"]
		name := p.Args["name"]
		account := p.Args["account"]
		adress := p.Args["adress"]
		phone := p.Args["phone"]
		email := p.Args["email"]
		website := p.Args["website"]

		if name == nil {
			name = ""
		}
		if establishement == nil {
			establishement = ""
		}
		if account == nil {
			account = ""
		}
		if adress == nil {
			adress = ""
		}
		if phone == nil {
			phone = ""
		}
		if email == nil {
			email = ""
		}
		if website == nil {
			website = ""
		}

		provider := AcquisitionModels.Provider{
			Establishement: establishement.(string),
			Name:           name.(string),
			Account:        account.(string),
			Adress:         adress.(string),
			Phone:          phone.(string),
			Email:          email.(string),
			Website:        website.(string),
		}
		result, err2 := coll.InsertOne(ctx, provider)
		if err2 != nil {
			log.Fatal(err2)
		}
		fmt.Println(result.InsertedID.(primitive.ObjectID))
		return result.InsertedID.(primitive.ObjectID), nil

	},
}

//Update provider
var UpdateProvider = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"establishement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"account": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"adress": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"phone": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"email": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"website": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("providers")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		establishement := p.Args["establishement"]
		name := p.Args["name"]
		account := p.Args["account"]
		adress := p.Args["adress"]
		phone := p.Args["phone"]
		email := p.Args["email"]
		website := p.Args["website"]

		ProviderUpdate := bson.M{}

		if establishement != nil {
			ProviderUpdate["establishement"] = establishement
		}
		if name != nil {
			ProviderUpdate["name"] = name
		}
		if account != nil {
			ProviderUpdate["account"] = account
		}
		if adress != nil {
			ProviderUpdate["adress"] = adress
		}
		if phone != nil {
			ProviderUpdate["phone"] = phone
		}
		if email != nil {
			ProviderUpdate["email"] = email
		}
		if website != nil {
			ProviderUpdate["website"] = website
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": ProviderUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

//Delete provider
var DeleteProvider = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("providers")

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
