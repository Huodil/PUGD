package CirculationMutation

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
	"os"
	"time"
)

var InsertOnePret = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"idBorrower": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"code_bar_copy": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"isExpress": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.Boolean),
		},
		"NombreMax": &graphql.ArgumentConfig{
			Type: graphql.Int,
		}, // id  : 22 , cop_code : 12 , 22 jour / 7 copy
		// id : 23 no pret
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		pret := CirculationModel.Pret{}
		idborrower := p.Args["idBorrower"]
		codeBarCopy := p.Args["code_bar_copy"]
		if codeBarCopy != nil && idborrower != nil {
			log.Printf(idborrower.(string))
			log.Printf(codeBarCopy.(string))
			copyResult, errorCopy := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{"barecode": codeBarCopy.(string)})
			if errorCopy != nil {
				log.Println("erro no doc err with this code bar")
				return nil, errors.New("ce code bare ne correspond a aucun copie")
			}
			if !copyResult.NoteForLoan {
				// ======================= check copy have current loan or not ?
				pret.IdCopy = copyResult.Id
				preted := pret.CurrentLoan()
				if preted != nil {
					return nil, errors.New("have a current loan ")
				}

				log.Printf("copy can continue process pret ..... \n  %v \n-----\n", copyResult.ToString())
				id, err := primitive.ObjectIDFromHex(idborrower.(string))
				if err != nil {
					return nil, errors.New("aucun borrower corespondent")
				}
				Borrower, _ := (&CirculationModel.Borrower{}).FindOne(id)
				satutsBorrower, noStatus := (&AdministrationModels.StatusBorrowers{}).FindStatusByID(Borrower.StatusBorrowers)
				if noStatus != nil {
					log.Printf("borrower don't have a status")
				}
				if satutsBorrower.IsAutorizedForLoan == true && satutsBorrower != nil {
					pret.Idborrower = id
					BorrowerHaveCurrentLoanInThisCopy := pret.Find()
					if BorrowerHaveCurrentLoanInThisCopy != nil {
						return nil, errors.New("ce lecteur est posed un pret encoure sur cett copies")
					}
					if isExpress := p.Args["isExpress"]; isExpress != nil {
						pret.IsExpress = isExpress.(bool)
					} else {
						pret.IsExpress = false
					}
					// ======================= est'il fait un reservation avant
					haveReservation, _ := (&CirculationModel.Reservation{}).FindOne(bson.M{
						"idcopy":     pret.IdCopy.Hex(),
						"idborrower": pret.Idborrower,
						"confirmed":  false,
					})
					if haveReservation != nil {
						log.Println("\n \n \n  y'a pas de reservation pour ce document")
						log.Println(haveReservation.ToString())
						return nil, errors.New("\n \n \n  y'a pas de reservation pour ce document")
					}
					// ======================= enregistrement de pret
					PretLimit, err := (&AdministrationModels.MediaTypes{}).FindMediaTypeByID(copyResult.MediaType)
					if err != nil {
						log.Println(" \n MediaType not fund  \n ")
					}
					log.Println("date limit pret : ", PretLimit.DurePret)
					pret.DateRetourPrev = time.Now().AddDate(0, 0, PretLimit.DurePret)
					//todo changer DuréPret to Duré Prolongement
					pret.Prologement.DateProlongement = pret.DateRetourPrev.AddDate(0, 0, PretLimit.DurePret)
					pret.IsPreted = true
					pret.DatePret = time.Now()
					lastId, err := pret.Store()
					if err != nil {
						fmt.Println("errro strore : ", err)
						return nil, errors.New("erreur d'insertion de pret")
					}
					fmt.Println(lastId.Hex())
					return lastId.Hex(), nil
				}
				return nil, errors.New("cett lecteur n'a pas l'autorisation a fair des pret de document")
			}
			return nil, errors.New("cette copy ne peut pas etre preté")
		}

		return nil, errors.New("veuillez verfier les information envoiyer")
	},
}

var UpdateOnePret = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"code_bar_copy": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		UpdatePret := bson.M{}
		pret := CirculationModel.Pret{}
		codeBarCopy := p.Args["code_bar_copy"]
		if codeBarCopy != nil {
			log.Printf(codeBarCopy.(string))
			copyResult, errorCopy := (&CatalogingModel.Copy{}).FindOneCopyByfilter(bson.M{"barecode": codeBarCopy.(string)})
			if errorCopy != nil {
				log.Println("erro no doc err with this code bar")
				return nil, errors.New("ce code bare ne correspond a aucun copie")
			}
			// ======================= check copy have current loan or not ?
			pret.IdCopy = copyResult.Id
			preted := pret.CurrentLoan()
			if preted != nil {
				pret.Id = preted.Id
				copyResult.Update(bson.M{"last_loan": preted.Idborrower})
				UpdatePret["is_Preted"] = false
				return pret.Update(UpdatePret)
			}
			return nil, errors.New("no have current loan ")
		}
		return nil, nil
	},
}

var DeleteOnePret = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Pret))

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
