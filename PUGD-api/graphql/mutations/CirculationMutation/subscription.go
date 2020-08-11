package CirculationMutation

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"os"
	"time"
)

var InsertOneSubscription = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"DateSub": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CodeSub": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"DateEnd": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Periodicity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		/*"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},*/
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection(os.Getenv(db.Subscriptions))

		DateSub := p.Args["DateSub"]
		CodeSub := p.Args["CodeSub"]
		DateEnd := p.Args["DateEnd "]
		Periodicity := p.Args["Periodicity"]

		if DateSub == nil {
			DateSub = ""
		}
		if CodeSub == nil {
			CodeSub = ""
		}
		if DateEnd == nil {
			DateEnd = ""
		}
		if Periodicity == nil {
			Periodicity = ""
		}

		//Category := []string{""}
		//if p.Args["Category"] != nil {
		//	ObjectIDCategory, err := primitive.ObjectIDFromHex(p.Args["Category"].(string))
		//	if err != nil {
		//		return nil, err
		//	}
		//	Category = []string{ObjectIDCategory.String()}
		//}

		var subscription = CirculationModel.Subscription{
			DateSub:     DateSub.(string),
			CodeSub:     CodeSub.(string),
			DateEnd:     DateEnd.(string),
			Periodicity: Periodicity.(string),
			//Category:     Category,
		}
		result, err2 := coll.InsertOne(ctx, subscription)
		if err2 != nil {
			log.Fatal(err2)
		}
		fmt.Println(result.InsertedID.(primitive.ObjectID))
		return result.InsertedID.(primitive.ObjectID), nil

	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneSubscription = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"DateSub": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CodeSub": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"DateEnd": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Periodicity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		/*"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},*/
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Subscriptions))

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		DateSub := p.Args["DateSub"]
		CodeSub := p.Args["CodeSub"]
		DateEnd := p.Args["DateEnd "]
		Periodicity := p.Args["Periodicity"]

		subscriptionUpdate := bson.M{}

		if DateSub != nil {
			subscriptionUpdate["DateSubscription"] = DateSub
		}
		if CodeSub != nil {
			subscriptionUpdate["CodeSubscription"] = CodeSub
		}
		if DateEnd != nil {
			subscriptionUpdate["DateEnd"] = DateEnd
		}
		if Periodicity != nil {
			subscriptionUpdate["Periodicity"] = Periodicity
		}

		//if p.Args["Category"] != nil {
		//	ObjectIDCategory, err := primitive.ObjectIDFromHex(p.Args["Category"].(string))
		//	if err != nil {
		//		return nil, err
		//	}
		//	serialUpdate["category"] = []string{ObjectIDCategory.String()}
		//}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": subscriptionUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneSubscription = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Subscriptions))

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
