package CirculationQueries

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"os"
	"strings"
	"time"
)

//Get record by _id
var GetOneBorrower = &graphql.Field{
	Type: CirculationTypes.BorrowerType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		return (&CirculationModel.Borrower{}).FindOne(_id)
	},
}

//params are optional
var GetAllBorrowers = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"filter": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		result := []bson.M{}

		if !strings.Contains(p.Args["filter"].(string), "*") {
			if Filter := p.Args["filter"]; Filter != "" {
				s := strings.Split(Filter.(string), " ")
				if len(s) > 1 {
					first, last := s[0], s[1]
					matchRecord := bson.D{
						{"$match", bson.D{
							{"$and", bson.A{
								bson.M{"first_name": primitive.Regex{Pattern: first, Options: ""}},
								bson.M{"last_name": primitive.Regex{Pattern: last, Options: ""}},
							}},
						}},
					}
					return (&CirculationModel.Borrower{}).FindBy(matchRecord)
				} else {
					matchRecord := bson.D{
						{"$match", bson.D{
							{"$or", bson.A{
								bson.M{"first_name": Filter.(string)},
								bson.M{"last_name": Filter.(string)},
								bson.M{"bar_code": Filter.(string)},
							}},
						}},
					}
					return (&CirculationModel.Borrower{}).FindBy(matchRecord)
				}
			}

		}
		res, err := CirculationModel.FindBorrowersByAnyProprieties(bson.M{})
		if err != nil {
			log.Printf("error ")
		}

		for _, element := range res {
			localisation, _ := CatalogingModel.FindLibraryByID(element.IdLibrary)
			static_Code, _ := (&AdministrationModels.CodeStatic{}).FindStatusByID(element.StaticCode)
			category, _ := (&CirculationModel.CategoriesBrrowers{}).FindOne(element.IdCategoriesBorrowers)
			stausBorrwers, _ := (&AdministrationModels.StatusBorrowers{}).FindStatusByID(element.StatusBorrowers)
			result = append(result, bson.M{
				"_id":                element.Id,
				"first_name":         element.Firstname,
				"last_name":          element.Lastname,
				"profession":         element.Profession,
				"bar_code":           element.Barcode,
				"address":            element.Address,
				"phone_number":       element.PhoneNumber,
				"birthday":           element.BirthDay,
				"email":              element.Email,
				"gender":             element.Gender,
				"statues":            element.Statues,
				"username_opac":      element.UsernameOpac,
				"password_opac":      element.PasswordOpac,
				"lang_opac":          element.LangOpac,
				"membershipstart":    element.MembershipStart,
				"membershipcanceled": element.MembershipCanceled,
				"message":            element.Message,
				"comment":            element.Comment,
				"static_code":        static_Code,
				"categories":         category,
				"localisation":       localisation,
				"stausBorrwers":      stausBorrwers,
			})
		}
		return result, nil

	},
}

var GetBorrowerWithPretAndReservation = &graphql.Field{
	Type: CirculationTypes.BorrowerWithPretAndReservationType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"code_bar": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}

		// ok
		matchBorrower := bson.D{{"$match", bson.D{{"_id", _id}}}}
		GroupToBorrower := bson.D{
			{"$group",
				bson.D{
					{"_id", "$_id"}, // key to regroup is _id = idborrower (FR : regrouper en utilisent idborrower )
					{"Borrower", bson.D{{"$addToSet", "$$ROOT"}}},
					//{"Doc",  bson.D{{"$push", "$$ROOT"}}},  // push permet d'envoiyer tout les idrecord au chant Records
				},
			}}
		lookupPret := bson.D{
			{"$lookup", bson.D{
				{"from", "Prets"},
				{"localField", "_id"},
				{"foreignField", "idborrower"},
				{"as", "list_pret"},
			}}}
		lookupReservation := bson.D{
			{"$lookup", bson.D{
				{"from", "Reservations"},
				{"localField", "_id"},
				{"foreignField", "idborrower"},
				{"as", "list_Reservations"},
			}}}
		deleteFiled := bson.D{
			{"$project", bson.D{
				{"_id", 0},
				//{"list_Reservations.confirmed", 0},
				//{"list_Reservations.dateres", 0},
				{"list_Reservations.idborrower", 0},
			}}}
		unwindBorrower := bson.D{
			{"$unwind", bson.D{
				{"path", "$Borrower"},
				{"preserveNullAndEmptyArrays", false}}}}

		showInfoReservation, err := models.DB.Collection(os.Getenv(db.Borrowers)).Aggregate(ctx,
			mongo.Pipeline{matchBorrower, GroupToBorrower, lookupPret,
				lookupReservation, deleteFiled, unwindBorrower})

		if err != nil {
			log.Print("errr : ", err)
			panic(err)
		}

		var showsReservationInfo []bson.M
		if err = showInfoReservation.All(ctx, &showsReservationInfo); err != nil {
			log.Print("er r ", err)
			panic(err)
		}
		return showsReservationInfo, nil
	},
}
