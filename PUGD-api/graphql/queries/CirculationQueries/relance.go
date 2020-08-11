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

//Get record by _id
var GetOneRelance = &graphql.Field{
	Type: CirculationTypes.RelanceType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		relance := &CirculationModel.Relance{}

		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection(os.Getenv(db.Relances)).FindOne(ctx, filter).Decode(relance)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return relance, nil
	},
}

//Get All Records
//params are optional

var GetAllRelances = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.RelanceType),
	Args: graphql.FieldConfigArgument{

		"Status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		Title := p.Args["Title"]

		filter := bson.M{}

		if Title != nil {
			filter["Title"] = Title
		}

		coll := models.DB.Collection(os.Getenv(db.Relances))

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CirculationModel.Relance

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		return results, nil

	},
}
