package CirculationTypes

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"log"
)

var AddressType = graphql.NewObject(graphql.ObjectConfig{
	Name: "AddressType",
	Fields: graphql.Fields{
		"rue1": &graphql.Field{
			Type: graphql.String,
		},
		"rue2": &graphql.Field{
			Type: graphql.String,
		},
		"city": &graphql.Field{
			Type: graphql.String,
		},
		"contry": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var BorrowerType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BorrowerType",
	Fields: graphql.Fields{
		"_id":          &graphql.Field{Type: ObjectID},
		"first_name":   &graphql.Field{Type: graphql.String},
		"last_name":    &graphql.Field{Type: graphql.String},
		"profession":   &graphql.Field{Type: graphql.String},
		"bar_code":     &graphql.Field{Type: graphql.String},
		"address":      &graphql.Field{Type: AddressType},
		"phone_number": &graphql.Field{Type: graphql.String},
		"birthday":     &graphql.Field{Type: graphql.DateTime},
		"email":        &graphql.Field{Type: graphql.String},
		"gender":       &graphql.Field{Type: graphql.String},
		"statues":      &graphql.Field{Type: graphql.String},
		// todo change to table
		"username_opac": &graphql.Field{Type: graphql.String},
		"password_opac": &graphql.Field{Type: graphql.String},
		"lang_opac":     &graphql.Field{Type: graphql.String},

		"membershipstart":    &graphql.Field{Type: graphql.DateTime},
		"membershipcanceled": &graphql.Field{Type: graphql.DateTime},
		// send
		"message": &graphql.Field{Type: graphql.String},
		"comment": &graphql.Field{Type: graphql.String},
		"static_code": &graphql.Field{
			Type: AdministrationTypes.CodeStaticType,
			/*Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if p.Source.(bson.M)["static_code"] != nil {
					inputObject := p.Source.(bson.M)["static_code"].(primitive.ObjectID)
					static_Code, ero := (&AdministrationModels.CodeStatic{}).FindStatusByID(inputObject)
					if ero != nil {
						log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
						return nil, nil
						//return nil, errors.New("No static_code Found \n----->Error path => CirculationTypes => categories\n")
					}
					return static_Code, nil
				}
				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).StaticCode.Hex())
				log.Print("==>> id static_code ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
					return nil, nil
					//return nil, errors.New("convert id static_code is Failed \n----->Error path => CirculationTypes => categories\n")
				}

				static_Code, ero := (&AdministrationModels.CodeStatic{}).FindStatusByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, nil
					//return nil, errors.New("No static_code Found \n----->Error path => CirculationTypes => categories\n")
				}
				return static_Code, nil
			},*/
		},
		// add to
		"categories": &graphql.Field{
			Type: CategorieBorrowerType,
			/*Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if p.Source.(bson.M)["categories_borrowers"] != nil {
					inputObject := p.Source.(bson.M)["categories_borrowers"].(primitive.ObjectID)
					categories, err := (&CirculationModel.CategoriesBrrowers{}).FindOne(inputObject)
					if err != nil {
						log.Print("error localisation \n", err)
					}
					log.Println(categories)
					return categories, nil
				}

				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).IdCategoriesBorrowers.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
					return nil, nil
					// return nil, errors.New("convert Id Categories Borrwers is Failed \n----->Error path => CirculationTypes => categories\n")
				}
				category, ero := (&CirculationModel.CategoriesBrrowers{}).FindOne(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, nil
					// return nil, errors.New("No Categories Found \n----->Error path => CirculationTypes => categories\n")
				}
				return category, nil

			},*/
		},
		// todo converti to group borrowers table
		/*"groups": &graphql.Field{
			Type: graphql.String,
		},*/
		"StatusBorrowers": &graphql.Field{
			Type: AdministrationTypes.StatusBorrowersType,
			/*	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).StatusBorrowers.Hex())
				stausBorrwers, err := (&AdministrationModels.StatusBorrowers{}).FindStatusByID(id)
				if err != nil {
					log.Print("error ")
				}
				return stausBorrwers, nil
			},*/
		},
		"localisation": &graphql.Field{
			Type: CatalogingTypes.LibraryType,
			/*Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if p.Source.(bson.M)["localisation"] != nil {
					inputObject := p.Source.(bson.M)["localisation"].(primitive.ObjectID)
					Library, err := CatalogingModel.FindLibraryByID(inputObject)
					if err != nil {
						log.Print("error localisation \n", err)
					}
					log.Println(Library)
					return Library, nil
				}
				id, errs := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).IdLibrary.Hex())
				if errs != nil {
					log.Println("-------------0.Error--------------------------")
					log.Println("11. ", errs)
				}
				log.Println("----------------------1-----------------")
				log.Println("11. ", id)

				Library, err := CatalogingModel.FindLibraryByID(id)
				if err != nil {
					log.Print("error localisation \n", err)
					return nil, errors.New("errors havent ")
				}
				log.Println(Library)
				log.Println("---------------------END------------------")
				return Library, nil
			},*/
		},
		"total_pret": &graphql.Field{
			Type: graphql.Int,
			/*	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id, _ := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).Id.Hex())
				filter := bson.M{}
				filter["idborrower"] = id
				var pret []*CirculationModel.Pret
				pret, _ = (&CirculationModel.Pret{}).FindPretByAnyProprieties(filter)
				log.Println("====> pres total : ", len(pret))
				return len(pret), nil
			},*/
		},
		"total_reservation": &graphql.Field{
			Type: graphql.Int,
			/*Resolve: func(p graphql.ResolveParams) (interface{}, error) {

				id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).Id.Hex())
				log.Println("err id :", err)
				log.Println("pres id : ", id)

				filter := bson.M{}
				filter["idborrower"] = id
				var reservation []*CirculationModel.Reservation
				reservation, _ = (&CirculationModel.Reservation{}).FindAllOrBy(filter)
				log.Println("pres tota : ", len(reservation))
				return len(reservation), nil
			},*/
		},
	},
})

var ObjectID = graphql.NewScalar(graphql.ScalarConfig{
	Name:        "BSONPret",
	Description: "The `bson` scalar type represents a BSON Object.",
	// Serialize serializes `bson.ObjectId` to string.
	Serialize: func(value interface{}) interface{} {
		switch value := value.(type) {
		case primitive.ObjectID:
			return value.Hex()
		case *primitive.ObjectID:
			v := *value
			return v.Hex()
		default:
			return nil
		}
	},
	// ParseValue parses GraphQL variables from `string` to `bson.ObjectId`.
	ParseValue: func(value interface{}) interface{} {
		switch value := value.(type) {
		case string:
			id, _ := primitive.ObjectIDFromHex(value)
			return id
		case *string:
			id, _ := primitive.ObjectIDFromHex(*value)
			return id
		default:
			return nil
		}
		return nil
	},
	// ParseLiteral parses GraphQL AST to `bson.ObjectId`.
	ParseLiteral: func(valueAST ast.Value) interface{} {
		switch valueAST := valueAST.(type) {
		case *ast.StringValue:
			id, _ := primitive.ObjectIDFromHex(valueAST.Value)
			return id
		}
		return nil
	},
})

var BorrowerWithPretAndReservationType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BorrowerWithPretAndReservationType",
	Fields: graphql.Fields{
		"Borrower": &graphql.Field{
			Type: BorrowerType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// borrower := &CirculationModel.Borrower{}
				received := p.Source.([]bson.M)[0]["Borrower"]
				log.Println("Borrower value ,", received)
				// byteData, _ := json.Marshal(received)
				// json.Unmarshal(byteData, &borrower)
				// fmt.Println("OK ",borrower)
				return received, nil
			},
		},
		"All_Reservation": &graphql.Field{
			Type: graphql.NewList(ReservationWithCopy),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				ids := p.Source.([]bson.M)[0]["list_Reservations"]
				// log.Print("\n \n ids---list_Reservations----- \n ", ids)
				return ids, nil
			},
		},
		"All_Pret": &graphql.Field{
			Type: graphql.NewList(ReservationWithCopy),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				ids := p.Source.([]bson.M)[0]["list_pret"]
				// log.Print("\n \n ids----list_pret---- \n ", ids)
				return ids, nil
			},
		},
	},
})

var ReservationWithCopy = graphql.NewObject(graphql.ObjectConfig{
	Name: "ReservationWithCopy",
	Fields: graphql.Fields{
		"date_init": &graphql.Field{
			Type: graphql.DateTime,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				id := p.Source.(bson.M)["_id"].(primitive.ObjectID)
				date := id.Timestamp()
				log.Println("date -----> :", date)
				/*y,d,m := date.Date()*/
				return date, nil
			},
		},
		"copy": &graphql.Field{
			Type: CatalogingTypes.CopyType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				objectId := p.Source.(bson.M)["idcopy"].(primitive.ObjectID)
				copyIs, _ := (&CatalogingModel.Copy{}).FindCopyByID(objectId)
				return copyIs, nil
			},
		},
		"date_prolongement": &graphql.Field{
			Type: graphql.DateTime,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date := p.Source.(bson.M)["prologement"].(bson.M)["date_prolongement"].(primitive.DateTime)

				log.Println("\n \n date_retour_prev ---> ", date.Time())
				// format : 26-06-2020
				return date.Time(), nil
			},
		},
		"rank": &graphql.Field{
			Type: graphql.Int,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				return p.Source.(bson.M)["rank"], nil
			},
		},
		"date_retour": &graphql.Field{
			Type: graphql.DateTime,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				date := p.Source.(bson.M)["date_retour_prev"].(primitive.DateTime)
				log.Println("\n \n date_retour_prev ---> ", date.Time())
				return date.Time(), nil
			},
		},
	},
})
