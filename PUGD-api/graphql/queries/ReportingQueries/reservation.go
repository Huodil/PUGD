package ReportingQueries

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"time"
)

var GetAllReservations = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.ReservationType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//Authorisation

		// Get the context from the paramsgo run main
		//cont := p.Context.Value("cont").(*gin.Context)
		// Validate the token
		// claims, err := utils.Authorize(cont)
		// If the token is not valid
		/*if err != nil {
			cont.AbortWithStatus(http.StatusUnauthorized)
			return nil, err
		}*/

		// fmt.Println("class id ",claims.Id)

		filter := bson.M{}

		/*pipeline := bson.M{
			"$group": bson.M{
				"_id":        "$idrecord",
				"idborrower": bson.M{"$idborrower": "$idborrower"},
			},
		}*/

		coll := models.DB.Collection(os.Getenv(db.Reservations))

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		var results []*CirculationModel.Reservation
		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal("error ==> ", err)
		}
		log.Println("Length of arr: ", len(results))
		for i, s := range results {
			rank := 0
			fmt.Println("======= id : ", i, s.ToString())
			for _, t := range results {
				if t.IdRecord == s.IdRecord {
					rank = rank + 1
					t.Rank = rank
				}
			}
		}
		return results, nil

	},
}

var GetReservationstrait = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.ReservationType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//Authorisation

		// Get the context from the params
		//cont := p.Context.Value("cont").(*gin.Context)
		// Validate the token
		// claims, err := utils.Authorize(cont)
		// If the token is not valid
		/*if err != nil {
			cont.AbortWithStatus(http.StatusUnauthorized)
			return nil, err
		}*/

		// fmt.Println("class id ",claims.Id)

		filter := bson.M{}
		filter["confirmed_reservation"] = true
		/*pipeline := bson.M{
			"$group": bson.M{
				"_id":        "$idrecord",
				"idborrower": bson.M{"$idborrower": "$idborrower"},
			},
		}*/

		coll := models.DB.Collection(os.Getenv(db.Reservations))

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		var results []*CirculationModel.Reservation
		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal("error ==> ", err)
		}
		log.Println("Length of arr: ", len(results))
		for i, s := range results {
			rank := 0
			fmt.Println("======= id : ", i, s.ToString())
			for _, t := range results {
				if t.IdRecord == s.IdRecord {
					rank = rank + 1
					t.Rank = rank
				}
			}
		}
		return results, nil

	},
}
