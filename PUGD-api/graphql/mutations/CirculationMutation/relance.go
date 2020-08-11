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

var InsertOneRelance = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Level": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Validity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		/*"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},*/
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection(os.Getenv(db.Relances))

		Title := p.Args["Title"]
		Level := p.Args["Level"]
		Validity := p.Args["Validity"]

		if Title == nil {
			Title = ""
		}
		if Level == nil {
			Level = ""
		}
		if Validity == nil {
			Validity = ""
		}

		//Category := []string{""}
		//if p.Args["Category"] != nil {
		//	ObjectIDCategory, err := primitive.ObjectIDFromHex(p.Args["Category"].(string))
		//	if err != nil {
		//		return nil, err
		//	}
		//	Category = []string{ObjectIDCategory.String()}
		//}

		var relance = CirculationModel.Relance{
			Title:    Title.(string),
			Level:    Level.(string),
			Validity: Validity.(string),
			//Category:     Category,
		}
		result, err2 := coll.InsertOne(ctx, relance)
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

var UpdateOneRelance = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"level": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Validity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		/*"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},*/
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Relances))

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		Title := p.Args["Title"]
		Level := p.Args["Level"]
		Validity := p.Args["Validity"]

		relanceUpdate := bson.M{}

		if Title != nil {
			relanceUpdate["title"] = Title
		}
		if Level != nil {
			relanceUpdate["level"] = Level
		}
		if Validity != nil {
			relanceUpdate["validity"] = Validity
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
				"$set": relanceUpdate,
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
var DeleteOneRelance = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Relances))

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
