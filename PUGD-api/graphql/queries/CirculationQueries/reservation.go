package CirculationQueries

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var GetOneReservation = &graphql.Field{
	Type: CirculationTypes.ReservationType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		reservation := &CirculationModel.Reservation{}
		filter := bson.M{}

		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		err = models.DB.Collection(os.Getenv(db.Reservations)).FindOne(ctx, filter).Decode(reservation)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		return reservation, nil
	},
}

//Params are optional
var GetAllReservations = &graphql.Field{
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
		coll := models.DB.Collection(os.Getenv(db.Reservations))
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
		// todo delate this for
		log.Println("Length of arr: ", len(results))
		for i, s := range results {
			rank := 0
			fmt.Println("======= id : ", i, s.ToString())
			for _, t := range results {
				if t.IdCopy == s.IdCopy {
					rank = rank + 1
					t.Rank = rank
				}
			}
		}
		return results, nil

	},
}

var GetReservationForBorrower = &graphql.Field{
	Type: CirculationTypes.ReservationType,
	Args: graphql.FieldConfigArgument{
		"idBorrower": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.M{}
		log.Print("----setp1")
		log.Print(p.Args["idBorrower"])

		if idBorrower := p.Args["idBorrower"]; idBorrower != nil {
			log.Print("----setp1.0")
			// filter in Reservation by id
			_id, err := primitive.ObjectIDFromHex(idBorrower.(string))

			if err != nil {
				return nil, err
			}
			filter["idborrower"] = _id

			//cursor, err := coll.Find(ctx, filter)
			/*lookupStage := bson.D{{"$group",bson.M{
				_id:"$idborrower",
			},
			}}*/

			ReservationForBorrower, err := (&CirculationModel.Reservation{}).FindMan(filter)
			b, err := json.MarshalIndent(ReservationForBorrower, "", " ")
			if err == nil {
				s := string(b)
				fmt.Println(s)
			}

			//log.Print("ReservationForBorrower : ", ReservationForBorrower)
			return ReservationForBorrower, nil
		}
		log.Print("----end")
		return "id have a erro", nil
	},
}

var GetSpecialReservation = &graphql.Field{
	Type: CirculationTypes.ReservationType,
	Args: graphql.FieldConfigArgument{
		"idBorrower": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

		// filter := bson.M{}
		log.Print("----setp1")
		log.Print(p.Args["idBorrower"])

		if idBorrower := p.Args["idBorrower"]; idBorrower != nil {
			log.Print("----setp1.0")
			// filter in Reservation by id

			id, _ := primitive.ObjectIDFromHex(idBorrower.(string))

			matchStage := bson.D{{"$match", bson.D{{"idborrower", id}}}}
			GroupStage := bson.D{{"$group",
				bson.D{
					{"_id", "$idborrower"},
					{"totalReservations", bson.D{{"$sum", 1}}},
					{"Copy", bson.D{{"$push", "$idcopy"}}},
				},
			}}
			/*
				lookupRecord := bson.D{{"$lookup", bson.D{

					{"from", "records"},
					{"localField", "idrecord"},
					{"foreignField", "_id"},
					{"as", "Record"},
				}}}
				lookupBorrowers := bson.D{{"$lookup", bson.D{
					{"from", "Borrowers"},
					{"localField", "idborrower"},
					{"foreignField", "_id"},
					{"as", "Borrwore"},
				}}}
				unwindRecord := bson.D{{"$unwind", bson.D{
					{"path", "$Record"},

				}}}
				unwindBorrowers := bson.D{{"$unwind", bson.D{
					{"path", "$Borrwore"},

				},
				}}
				/*projection := bson.D{{"$project", bson.D{
					{"Borrowers", 1},
					{"Record", 1},
					//{"idrecord", 0},
					//{"idborrower", 0},
					//{"_id", 0},
					{"rank", 0},
				}}}*/
			/*projection := bson.D{{"$project", bson.D{
				{"idrecord", 1},
				{"idborrower", 1},
				{"_id", 0},
			}}}
			//unwindStage := bson.D{{"$unwind", bson.D{{"path", "$podcast"}, {"preserveNullAndEmptyArrays", false}}}}

			// condition to check if idborrower is egal to idBorrower ?
			// confition
			matchStage := bson.D{{"$match", bson.D{{"idborrower", id}}}}
			// confition is true ? fait cett traitment  // condition is false ne fait rient
			/*groupStage := bson.D{{"$group",
			bson.D{{"Borrwore", "$Borrwore"},
			}}}

			GroupStage := bson.D{{"$group",
				bson.D{
					{"idborrower", "$_id"},
					{"Record", bson.D{{"$push", "$Record"}}},
					{"Total", bson.D{{"$first", "$Total"}}},
				},
			}}*/

			showInfoCursor, err := models.DB.Collection(os.Getenv(db.Reservations)).Aggregate(ctx,
				mongo.Pipeline{matchStage, GroupStage})

			if err != nil {
				log.Print("errr : ", err)
				panic(err)
			}

			log.Print("\n")
			var showsWithInfo []bson.M
			if err = showInfoCursor.All(ctx, &showsWithInfo); err != nil {
				log.Print("err")
				panic(err)
			}

			b, err := json.MarshalIndent(showsWithInfo, "", " ")
			if err == nil {
				s := string(b)
				fmt.Println(s)
			}

			//log.Print("er : ", &showsWithInfo)
			return &showsWithInfo, nil
			/*_id, err := primitive.ObjectIDFromHex(idBorrower.(string))

			if err != nil {
				return nil, err
			}
			filter["idborrower"] = _id



			ReservationForBorrower, err := (&CirculationModel.Reservation{}).FindMan(filter)
			b, err := json.MarshalIndent(ReservationForBorrower, "", " ")
			if err == nil {
				s := string(b)
				fmt.Println(s)
			}

			//log.Print("ReservationForBorrower : ", ReservationForBorrower)
			return ReservationForBorrower, nil*/
		}
		log.Print("----end")
		return "id have a erro", nil
	},
}

var FindReservation = &graphql.Field{
	Type: CirculationTypes.ReservationType,
	Args: graphql.FieldConfigArgument{
		"code_bar": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		// filter := bson.M{}
		log.Print("----setp1")
		log.Print(p.Args["idBorrower"])

		if code_bar := p.Args["code_bar"]; code_bar != nil {
			log.Print("----setp1.0")
			// filter in Reservation by code_bar
			/*matchStage := bson.D{{"$match", bson.D{{"barecode", code_bar}}}}
			lookupReservation := bson.D{{"$lookup", bson.D{
				{"from", "Reservations"},
				{"localField", "_id"},
				{"foreignField", "idcopy"},
				{"as", "ReservationValue"},
			}}}
			addFileds := bson.D{{
				"$addFields",
				bson.D{{"ReservationValue",
					bson.D{{
					"$arrayElemAt", bson.D{
						{"$filter",bson.D{
							{"input","$ReservationValue"},
							{"as","res"},
							{"cond",bson.D{
								{
									"$eq",bson.M{
										"confirmed":false,
										"rank":1,
										//{"rank",1},
									}},
								},
							},
						},
						},
					},
				}}}},
			}}
			showInfoCursor, err := models.DB.Collection(os.Getenv(db.Copies)).Aggregate(ctx,
				mongo.Pipeline{matchStage, lookupReservation ,addFileds,

					// lookupBorrowers, unwindRecord, unwindBorrowers,
				})
			*/

			copies, err := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{"barecode": code_bar})

			if err != nil {
				log.Print("errr : ", err)

			}

			log.Println("----\n ", copies.Id)
			r, _ := (&CirculationModel.Reservation{}).FindOne(bson.M{
				"idcopy":    copies.Id,
				"confirmed": false,
				"rank":      1,
			})
			log.Println("\n \n res : \n ", r.ToString())
			/*log.Print("\n")
			var showsWithInfo []bson.M
			if err = showInfoCursor.All(ctx, &showsWithInfo); err != nil {
				log.Print("err")
				panic(err)
			}

			b, err := json.MarshalIndent(showsWithInfo, "", " ")
			if err == nil {
				s := string(b)
				fmt.Println(s)
			}*/

			//log.Print("er : ", &showsWithInfo)

			//			return &showsWithInfo, nil

			return r, nil

		}
		log.Print("----end")
		return "id have a erro", nil
	},
}

var ValidateReservation = &graphql.Field{
	Type: CirculationTypes.ValidReservation,
	Args: graphql.FieldConfigArgument{
		"code_bar": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		valide := bson.M{}
		barcode := p.Args["code_bar"]
		if barcode != nil {
			copie, err := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{
				"barecode": barcode.(string),
			})
			if err != nil {
				log.Print("errr no reservation for this copy : ", err)

			}
			reservation, NotReserved := (&CirculationModel.Reservation{}).FindOne(bson.M{
				"idcopy":    copie.Id,
				"confirmed": false,
				"rank":      1,
			})
			if NotReserved != nil {
				log.Printf("CETTE COPIES N'A JAMAINS ETE RESERVEÉ")
				lastloan, NotHaveLoan := (&CirculationModel.Borrower{}).FindOne(copie.LastLoan)

				if NotHaveLoan != nil {
					log.Printf("copies pas de lostloan")
					valide["lastLoan"] = nil
				}
				valide["lastLoan"] = lastloan
				valide["borrower"] = nil
				valide["confirmed"] = false
				valide["isChecked"] = true
				valide["rank"] = -1
				valide["_id"] = nil
				valide["copy"] = copie
				return valide, nil
			}
			log.Printf(reservation.ToString())
			Borrower, _ := (&CirculationModel.Borrower{}).FindOne(reservation.Idborrower)
			lastloan, _ := (&CirculationModel.Pret{}).FindOne(copie.LastLoan)
			valide["copy"] = copie
			valide["lastLoan"] = lastloan
			valide["borrower"] = Borrower
			valide["confirmed"] = reservation.Confirmed
			valide["isChecked"] = reservation.Checked
			valide["rank"] = reservation.Rank
			valide["_id"] = reservation.Id
			return valide, nil
		}
		return "no copy", nil
	},
}
