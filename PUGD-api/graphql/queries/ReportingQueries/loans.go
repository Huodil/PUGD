package ReportingQueries

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/CirculationTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"os"
	//"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"

	"github.com/graphql-go/graphql"
	//"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

var GetLoans = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.PretType),
	Args: graphql.FieldConfigArgument{},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		filter := bson.M{}
		filter["Retour"] = false
		cursor, err := models.DB.Collection("loans").Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		var Laons []*CirculationModel.Pret
		if errg := cursor.All(ctx, &Laons); errg != nil {
			log.Fatal(errg)
		}
		//fmt.Println(Records.Title)
		//return copyLaons, nil
		return Laons, nil
	},
}
var Getretard = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.PretType),
	Args: graphql.FieldConfigArgument{},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		t := time.Now()
		filter := bson.M{}
		//filter["Retour"] = false
		cursor, err := models.DB.Collection("loans").Find(ctx, filter)
		var Loans []*CirculationModel.Pret
		var Loansretard []*CirculationModel.Pret
		if errg := cursor.All(ctx, &Loans); errg != nil {
			log.Fatal(errg)
		}
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		for i := 0; i < len(Loans); i++ {
			//Todo acces to copyid
			//filtercopy["_id"] = results[i].Copy
			fmt.Println(len(Loans))
			diff := Loans[i].DateRetour.Sub(t)
			fmt.Println("dayte", Loans[i].DateRetour)
			days := int(diff.Hours() / 24)
			if days > 0 {
				Loansretard = append(Loansretard, Loans[i])
			}
			fmt.Println("ffffff")
			fmt.Println(days)
			i = i + 1
		}
		fmt.Println(Loansretard)
		//Todo add loans table to circulation model and access copy id
		/*		var results []*CirculationModel.Loans
				var copyLaons []*CatalogingModel.Copy
				var copys *CatalogingModel.Copy
				if errg := cursor.All(ctx, &results); errg != nil {
					log.Fatal(errg)
				}
				filtercopy := bson.M{}
				i := 0
				for i < len(results) {
					//Todo acces to copyid
					//iltercopy["_id"] = results[i].Copy
					err := models.DB.Collection("Copy").FindOne(ctx, filtercopy).Decode(copys)
					if err != nil {
						if err == mongo.ErrNoDocuments {
							log.Fatal(err)
							return nil, nil
						}
					}
					copyLaons = append(copyLaons, copys)
					//copys = copys+copy
					i += i
				}*/
		//fmt.Println(Records.Title)
		//return copyLaons, nil
		return Loansretard, nil
	},
}
var filecreation = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.PretType),
	Args: graphql.FieldConfigArgument{},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		t := time.Now()
		filter := bson.M{}
		//filter["Retour"] = false
		cursor, err := models.DB.Collection("loans").Find(ctx, filter)
		var Loans []*CirculationModel.Pret
		var Loansretard []*CirculationModel.Pret
		if errg := cursor.All(ctx, &Loans); errg != nil {
			log.Fatal(errg)
		}
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		for i := 0; i < len(Loans); i++ {
			//Todo acces to copyid
			//filtercopy["_id"] = results[i].Copy
			fmt.Println(len(Loans))
			diff := Loans[i].DateRetour.Sub(t)
			fmt.Println("dayte", Loans[i].DateRetour)
			days := int(diff.Hours() / 24)
			if days > 0 {
				Loansretard = append(Loansretard, Loans[i])
			}
			fmt.Println("ffffff")
			fmt.Println(days)
			i = i + 1
		}
		fmt.Println(Loansretard)
		return Loansretard, nil
	},
}
var Getdelaybyborrower = &graphql.Field{
	Type: graphql.NewList(CirculationTypes.PretType),
	Args: graphql.FieldConfigArgument{
		"CategoriesBorrower": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		t := time.Now()
		filter := bson.M{}
		Categoriesborrower := &CirculationModel.CategoriesBrrowers{}
		if Categories := p.Args["CategoriesBorrower"]; Categories != nil {
			filterBorrower := bson.M{}
			filterBorrower["namecategoriesbrrowers"] = Categories
			fmt.Println("id", Categories)
			err := models.DB.Collection(os.Getenv(db.CategoriesBorrowers)).FindOne(ctx, filter).Decode(Categoriesborrower)
			filter["idcatbr"] = Categoriesborrower.Id
			if err != nil {
				if err == mongo.ErrNoDocuments {
					log.Fatal(err)
					return nil, nil
				}
			}
		}
		cursor, err := models.DB.Collection(os.Getenv(db.Borrowers)).Find(ctx, filter)
		var Borrower []*CirculationModel.Borrower
		var LoanS []*CirculationModel.Pret
		var Loans []*CirculationModel.Pret
		if err = cursor.All(ctx, &Borrower); err != nil {
			log.Fatal(err)
		}
		filterloans := bson.M{}
		for i := 0; i < len(Borrower); i++ {
			filterloans["Borrower"] = Borrower[i].Id
			fmt.Println("id", Borrower[i].Id)
			cursor1, err := models.DB.Collection("loans").Find(ctx, filterloans)
			if err = cursor1.All(ctx, &Loans); err != nil {
				log.Fatal(err)
			}
			if err != nil {
				if err == mongo.ErrNoDocuments {
					log.Fatal(err)
					return nil, nil
				}
			}
			for j := 0; j < len(Loans); j++ {
				fmt.Println(Loans)
				fmt.Println(filterloans["Borrower"])
				diff := Loans[j].DateRetour.Sub(t)
				fmt.Println("dayte", Loans[j].DateRetour)
				days := int(diff.Hours() / 24)
				if err != nil {
					if err == mongo.ErrNoDocuments {
						log.Fatal(err)
						return nil, nil
					}
				}
				if -days > 0 {
					LoanS = append(LoanS, Loans[j])
				}
				fmt.Println("ffffff")
				fmt.Println(days)
			}
		}
		fmt.Println("len", len(LoanS))
		fmt.Println("id", LoanS)
		return LoanS, nil
	},
}
