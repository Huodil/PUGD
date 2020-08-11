package CirculationQueries

import (
	"errors"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var GetPretOfBorrower = &graphql.Field{
	Type: CirculationTypes.Totals,
	Args: graphql.FieldConfigArgument{
		"idBorrower": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		filter := bson.M{}

		if idBorrower := p.Args["idBorrower"]; idBorrower != nil {
			log.Print("----setp1.0")
			// filter in Reservation by id
			_id, err := primitive.ObjectIDFromHex(idBorrower.(string))

			if err != nil {
				return nil, err
			}
			filter["borrower"] = _id
			Total, err := (&CirculationModel.Pret{}).FindPretByAnyProprieties(filter)
			if err != nil {
				return nil, errors.New("Pas de pert")
			}
			return len(Total), err

		}

		return "pas de pret correspodant", nil
	},
}

//Params are optional
var GetAllPret = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.PretType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		pret := CirculationModel.Pret{}
		FindAll := bson.M{}
		return pret.FindPretByAnyProprieties(FindAll)
	},
}

// todo delate this
var ReturnCopy = &graphql.Field{
	Type: CirculationTypes.ReturnCopy,
	Args: graphql.FieldConfigArgument{
		"code_bar": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		use := bson.M{}
		barcode := p.Args["code_bar"]
		if barcode != nil {
			/*matchStage := bson.D{{"$match", bson.D{
				{"barecode", barcode.(string)},
			}}}

			addFiledNamedCopy := bson.D{{
				"$set", bson.D{{"copy","$$ROOT"}},
			}}*/
			copie, err := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{
				"barecode": barcode.(string),
			})
			Pret, err := (&CirculationModel.Pret{}).FindOneByProprietry(bson.M{
				"idcopy":    copie.Id,
				"is_preted": true,
			})
			// to get lastLoan
			if Pret != nil {
				LastLoan, _ := (&CirculationModel.Borrower{}).FindOne(Pret.Idborrower)
				updated, _ := Pret.Update(bson.M{"is_preted": false})
				log.Printf("update number : %v \n \n", updated)
				use["isLoan"] = Pret.IsPreted
				use["lastLoan"] = LastLoan
			}
			if err != nil {
				LastLoan, _ := (&CirculationModel.Borrower{}).FindOne(copie.LastLoan)
				use["isLoan"] = false
				use["lastLoan"] = LastLoan
			}
			reservation, _ := (&CirculationModel.Reservation{}).FindOne(bson.M{
				"idcopy":    copie.Id,
				"confirmed": false,
				"rank":      1,
			})
			if reservation != nil {
				nextLoan, _ := (&CirculationModel.Borrower{}).FindOne(reservation.Idborrower)
				use["nextLoan"] = nextLoan
			}
			// =========== Aggrégation
			// affiche les field a pour valuer 1
			/*	ShowSomeFiled := bson.D{{
					"$project", bson.D{
						{"_id", 0},
						{"copy", 1},
					},

				}}
				lookupReservation := bson.D{{"$lookup", bson.D{
					{"from", "Reservations"},
					{"localField", "copy._id"},
					{"foreignField", "idcopy"},
					{"as", "fromReservations"},
				}}}
				nextLoan := bson.D{{"$lookup", bson.D{
					{"from", "Borrowers"},
					{"localField", "fromReservations.idborrower"},
					{"foreignField", "_id"},
					{"as", "nextLoan"},
				}}}
				lookupPret := bson.D{{"$lookup", bson.D{
					{"from", "Prets"},
					{"localField", "copy._id"},
					{"foreignField", "idcopy"},
					{"as", "fromPrets"},
				}}}
				lastLoan := bson.D{{"$lookup", bson.D{
					{"from", "Borrowers"},
					{"localField", "fromPrets.idborrower"},
					{"foreignField", "_id"},
					{"as", "lastLoan"},
				}}}*/
			// todo need to active this
			/*lookupFromPret := bson.D{{
				"$lookup", bson.D{
						{"from", "Prets"},
				// declaration du variable de recharche avec lookup
						{"let" , bson.D{
							{"id","$copy._id"},
						}},
						{"pipeline", bson.D{
							{"$match" ,
								bson.D{
									{"is_preted",true},
									{"$expr", bson.D{{
										"$eq" , bson.D{
											{"$idcopy","$$id"},
										},
									}}},
								},
							},
						{"$project",bson.D{
								{"_id",0},
								{"idborrower",1},
								{"is_preted",1},
							},
						},
				}},
				{"as", "Lo"},
			}}}*/
			/*showInfoCursor, err := models.DB.Collection(os.Getenv(db.Copies)).Aggregate(ctx,
				mongo.Pipeline{matchStage,addFiledNamedCopy,
				})

			var showsWithInfo []bson.M
			if err = showInfoCursor.All(ctx, &showsWithInfo); err != nil {
				log.Print("err")
				panic(err)
			}*/
			// ===========
			use["copy"] = copie
			// debug in console
			/*b, err := json.MarshalIndent(use, "", " ")
			if err == nil {
				s := string(b)
				fmt.Println(s)
			}*/
			return use, nil
		}
		return nil, nil
	},
}
