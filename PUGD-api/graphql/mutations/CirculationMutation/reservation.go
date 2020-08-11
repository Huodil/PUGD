package CirculationMutation

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneReservation = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"idborrower": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"code_bar_copy": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"record_identifient": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		// la reservation se fait sur un examplaire ,
		// se fait sur un notice qui poséde un examplaire uniquement
		// var idCopy primitive.ObjectID
		reservation := CirculationModel.Reservation{}
		reservation.Confirmed = false
		reservation.Checked = false
		reservation.DateConfirmation = time.Now()
		reservation.DateRetour = time.Now()

		idborrower := p.Args["idborrower"]
		codeBarCopy := p.Args["code_bar_copy"]
		if codeBarCopy != nil && idborrower != nil {
			log.Printf(idborrower.(string))
			log.Printf(codeBarCopy.(string))
			copyToReserve, _ := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{"barecode": codeBarCopy.(string)})
			if copyToReserve != nil {
				log.Printf("process Reservation")
				if !copyToReserve.NoteForLoan {
					// ======================= check copy have current loan or not ?
					log.Printf("copy can continue process pret ..... \n  %v \n-----\n", reservation.ToString())
					reservation.IdCopy = copyToReserve.Id
					id, err := primitive.ObjectIDFromHex(idborrower.(string))
					if err != nil {
						return nil, errors.New("aucun borrower corespondent")
					}
					Borrower, _ := (&CirculationModel.Borrower{}).FindOne(id)
					satutsBorrower, noStatus := (&AdministrationModels.StatusBorrowers{}).FindStatusByID(Borrower.StatusBorrowers)
					if noStatus != nil {
						log.Printf("borrower don't have a status")
						return nil, errors.New("borrower can't affected a reservation")
					}
					if satutsBorrower.IsAutorizedForReservation == true {
						reservation.Idborrower = Borrower.Id
						// ======================= est'il fait un reservation avant
						haveReservation := reservation.CurrentReservation()
						if haveReservation != nil {
							return nil, errors.New("ce lecteur est deja reservé cette copies")
						}
						// attribution du rank pour cette reservation

						total := (&CirculationModel.Reservation{}).FindTotalReservationForCopy(
							bson.M{
								"idcopy":    copyToReserve.Id,
								"confirmed": false,
							})

						log.Print("----Reservation len ------\n ", total)
						reservation.Rank = total + 1
						lastId, errInsert := reservation.Store()
						if errInsert != nil {
							return nil, errInsert
						}
						fmt.Println(lastId.Hex())
						return lastId.Hex(), nil
					}
					return nil, errors.New("cett lecteur n'a pas l'autorisation a fair des pret de document")
				}

			}
			return nil, errors.New("pa de copy correspondant ce code bare")
		}
		return nil, errors.New("bade information Reservation")
	},
}

/*
var InsertOneReservations = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"idBorrower": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"idRecord": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//initRank := 0


		// ReservedModel := CirculationModel.Reservation{}
		// filter := CatalogingModel.Copy
		_idborrower, err := primitive.ObjectIDFromHex(p.Args["idBorrower"].(string))
		if err != nil {
			return nil, err
		}
		_idrecord, err := primitive.ObjectIDFromHex(p.Args["idRecord"].(string))
		if err != nil {
			return nil, err
		}



		// ok
		matchBorrower := bson.D{
			{"$match", bson.D{
				{"$and", bson.A{
					bson.D{{"idborrower", _idborrower}},
					bson.D{{"idrecord", _idrecord}},
					bson.D{{"confirmed", false}},
				}},
			}}}

		// filter := bson.M{}
		log.Println("setp1 \n")
		coll := models.DB.Collection(os.Getenv(db.Reservations))
		cursor, err := coll.Aggregate(ctx, mongo.Pipeline{matchBorrower})
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Println("error",err)
				return nil, nil
			}
		}
		fmt.Sprintf("setp2 \n %v ",cursor)
		var results []*CirculationModel.Reservation
		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal("error ==> ", err)
		}
		fmt.Sprintf("Length of arr: %v ", len(results))
		for i, s := range results {
			rank := 0
			for _, t := range results {
				if t.IdRecord == s.IdRecord {
					rank = rank + 1
					t.Rank = rank
				}
			}
			fmt.Println("======= id : ", i, s.ToString())
		}
		/*showInfoReservation, err := models.DB.Collection(os.Getenv(db.Reservations)).Aggregate(ctx,
			mongo.Pipeline{matchBorrower})

		if err != nil {
			log.Print("errr : ", err)
			panic(err)
		}

	/*	var showsReservationInfo []bson.M
		if err = showInfoReservation.All(ctx, &showsReservationInfo); err != nil {
			log.Print("er r ", err)
			panic(err)
		}

		log.Print("----Reservation list1 ------\n ", showInfoReservation)

 ..


		log.Print("-------Reservation list ------\n ")
		bt, errc := json.MarshalIndent(results, "", " ")
		if errc == nil {
			s := string(bt)
			fmt.Println(s)
		}
		log.Print("----Reservation len ------\n ", len(results))

		today := time.Now().Format("01-01-1970")
		filter := bson.D{{"confirmed", false}}
		update := bson.D{{"$inc", bson.D{{"rank", 1}}}}

		log.Println("today : " , today)
		result, err := coll.UpdateMany(ctx, filter, update)
		if err != nil {
			log.Fatal(err)
		}

		if result.MatchedCount != 0 {
			fmt.Println("matched and replaced an existing document")

		}
		/*reservationUpdate := bson.M{}
		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": reservationUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		 log.Println(result.ModifiedCount)

..
		return nil, nil
	},
}
*/
// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneReservation = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		reservationUpdate := bson.M{}
		reservation := CirculationModel.Reservation{}
		reservationUpdate["confirmed"] = true

		if p.Args["_id"] != nil {
			_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
			if err != nil {
				return nil, err
			}

			log.Println("id reservation : ", _id.Timestamp().Format(time.RFC3339))
			log.Println("id reservation : ", _id.Timestamp().Format(time.RFC850))
			reservation.Id = _id
		}

		reservationExiste := reservation.Find()
		log.Println("to string ------ \n \n ", reservationExiste.ToString())
		if reservationExiste.Rank == 1 && reservationExiste.Confirmed == false {

			copy, _ := (&CatalogingModel.Copy{}).FindCopyByID(reservationExiste.IdCopy)
			log.Printf("copi v \n %v:", copy.ToString())
			MediaType, _ := (&AdministrationModels.MediaTypes{}).FindMediaTypeByID(copy.MediaType)
			reservationUpdate["date_confirmation"] = time.Now()
			log.Printf("vaule DureReservation %s \n \n", MediaType.DureReservation)
			reservationUpdate["date_retour"] = time.Now().AddDate(0, 0, MediaType.DureReservation)

			// update and update all rank of this copy
			updateNummber, _ := reservation.Update(reservationUpdate)
			log.Println("update : ", updateNummber)
			return (&CirculationModel.Reservation{}).UpdateAll(reservationExiste.IdCopy)
		}
		log.Println("error reservation déja validé")
		return "Reservataion deja validé", nil
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneReservation = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Reservations))

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
