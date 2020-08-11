package ReportingQueries

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"strings"
	"time"
)

var GetBorrowerCity = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"City": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		filter := bson.M{}

		City := p.Args["City"]
		if City == nil {
			City = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["City"] = City
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

//Todo add category borrower in circulation model
/*var GetBorrowersCategory = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Sexe": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		filter := bson.M{}
		filterCategory := bson.M{}
		categories := &CirculationModel.Categ_Borrowers{}
		if Sexe := p.Args["Sexe"]; Sexe != nil {
			filter["Sexe"] = Sexe
		}
		if Category := p.Args["Category"]; Category != nil {
			filterCategory["Name_Categ"] = Category
			err := models.DB.Collection("Categ_Borrowers").FindOne(ctx, filterCategory).Decode(categories)
			filter["Category"] = categories.ID_CatBr
			if err != nil {
				if err == mongo.ErrNoDocuments {
					log.Fatal(err)
					return nil, nil
				}
			}
		}

		var Borrowers []*CirculationModel.Borrower

		cursor, err := models.DB.Collection("Borrowers").Find(ctx, filter)
		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		return Borrowers, nil
	},
}*/
var GetBorrowerAge = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"BeginingYear": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.Int),
		},
		"LastYear": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.Int),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}
		beginigYear := p.Args["BeginingYear"].(int)
		LastYear := p.Args["LastYear"].(int)

		var Borrowers []*CirculationModel.Borrower
		i := beginigYear
		var BorrowersArray []*CirculationModel.Borrower
		for i < LastYear {
			filter["Age"] = i
			cursor, err := models.DB.Collection("borrower").Find(ctx, filter)
			if err = cursor.All(ctx, &Borrowers); err != nil {
				log.Fatal(err)
			}
			copy(BorrowersArray, Borrowers)
		}

		return Borrowers, nil
	},
}

var GetBorrowerBirthday = &graphql.Field{

	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Birthday": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		filter := bson.M{}

		Birthday := p.Args["Birthday"]
		if Birthday == nil {
			Birthday = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["Birthday"] = Birthday
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerBarCode = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Barcode": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		filter := bson.M{}

		Barcode := p.Args["Barcode"]
		if Barcode == nil {
			Barcode = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["Barcode"] = Barcode
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerAddress = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Address": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}

		Address := p.Args["Address"]
		if Address == nil {
			Address = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["Address "] = Address
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerStatus = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Status": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}

		Status := p.Args["Status"]
		if Status == nil {
			Status = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["Status"] = Status
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerFirstName = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"FirstName": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}

		FirstName := p.Args["FirstName"]
		if FirstName == nil {
			FirstName = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["FirstName"] = FirstName
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerLastName = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"LastName": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}

		LastName := p.Args["FirstName"]
		if LastName == nil {
			LastName = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["LastName"] = LastName
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetBorrowerEmail = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"Email": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}

		Email := p.Args["Email "]
		if Email == nil {
			Email = ""
		}
		var Borrowers []*CirculationModel.Borrower
		filter["Email"] = Email
		cursor, err := models.DB.Collection("borrower").Find(ctx, filter)

		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}

		if err = cursor.All(ctx, &Borrowers); err != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return Borrowers, nil
	},
}

var GetAllBorrowers = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.BorrowerType),
	Args: graphql.FieldConfigArgument{
		"first_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"last_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"bar_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.M{}
		log.Print("----setp1")
		log.Print(p.Args["full_name"])
		log.Print(p.Args["bar_code"])

		if FullName := p.Args["full_name"]; FullName != nil {
			log.Print("----setp1.0")
			s := strings.Split(FullName.(string), " ")
			log.Print("split value ", s)
			log.Print("split value ", len(s))
			if len(s) > 1 {
				first, last := s[0], s[1]
				log.Println("first name %s %s", first, last)
				filter["first_name"] = primitive.Regex{Pattern: first, Options: ""}
				filter["last_name"] = primitive.Regex{Pattern: last, Options: ""}
			} else {
				filter["first_name"] = primitive.Regex{Pattern: FullName.(string), Options: ""}
			}

		}
		if BarCode := p.Args["bar_code"]; BarCode != nil {
			log.Print("----setp1.1")
			filter["bar_code"] = primitive.Regex{Pattern: BarCode.(string), Options: ""}
		}
		log.Print("----end")
		return CirculationModel.FindBorrowersByAnyProprieties(filter)

	},
}
