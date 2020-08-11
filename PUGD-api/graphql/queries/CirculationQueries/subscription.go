package CirculationQueries

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var GetOneSubscription = &graphql.Field{
	Type: CirculationTypes.SubscriptionType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		subscription := &CirculationModel.Subscription{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection(os.Getenv(db.Subscriptions)).FindOne(ctx, filter).Decode(subscription)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return subscription, nil
	},
}

//Get All Records
//params are optional

var GetAllSubscriptions = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.SubscriptionType),
	Args: graphql.FieldConfigArgument{

		"CodeSub": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		CodeSub := p.Args["CodeSub"]

		filter := bson.M{}

		if CodeSub != nil {
			filter["CodeSub"] = CodeSub
		}

		coll := models.DB.Collection(os.Getenv(db.Subscriptions))

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CirculationModel.Subscription

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
