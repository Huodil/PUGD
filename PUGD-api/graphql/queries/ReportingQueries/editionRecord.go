package ReportingQueries

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var GetRecordYear = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.RecordType),
	Args: graphql.FieldConfigArgument{
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		Records := &CatalogingModel.Record{}

		filter := bson.M{}
		Authors := &authorityModels.Author{}
		Rec_Year := p.Args["RecYear"]

		Author, err := p.Args["author"]

		if Rec_Year == nil {
			Rec_Year = 0
		}

		if Author == nil {
			Author = ""
		}

		filterauthor := bson.M{}
		filter["RecYear"] = Rec_Year
		//filter["Language"] = Language

		//filter["Title"] = title
		/*filter["NbPage"] = NbPage
		filter["category"] = Category*/
		filterauthor["Name"] = Author
		errl := models.DB.Collection("author").FindOne(ctx, filterauthor).Decode(Authors)
		fmt.Println("name", Authors.Name_Auth)
		fmt.Println("id", Authors.Id)
		filter["author"] = Authors.Id
		cursor, errg := models.DB.Collection("record").Find(ctx, filter)
		fmt.Println("name", Authors.Name_Auth)
		//Records.Outher=Outhers.Name
		fmt.Println("name", Records)
		var results []*CatalogingModel.Record
		if errl != nil {
			if errl == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}
		}
		if errg != nil {
			if errg == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}
		if errl = cursor.All(ctx, &results); errl != nil {
			log.Fatal(err)
		}
		//fmt.Println(Records.Title)
		return results, nil
	},
}

var GetRecord = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.RecordType),
	Args: graphql.FieldConfigArgument{
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},

		"Original_language": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Category": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NbPage": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//Records := &models.Records{}

		filter := bson.M{}
		Authors := &authorityModels.Author{}

		categories := &authorityModels.Category{}

		filterauthor := bson.M{}
		filterPublisher := bson.M{}
		filterCategory := bson.M{}

		if Rec_Year := p.Args["RecYear"]; Rec_Year != nil {
			filter["RecYear"] = Rec_Year

		}

		if language := p.Args["Original_language"]; language != nil {
			filterlanguage := bson.M{}
			languages := &CatalogingModel.Language{}
			filterlanguage["Language"] = language
			errlanguage := models.DB.Collection("language").FindOne(ctx, filterlanguage).Decode(languages)
			filter["language"] = languages.Id
			if errlanguage != nil {
				if errlanguage == mongo.ErrNoDocuments {
					log.Fatal(errlanguage)
					return nil, nil
				}
			}
		}
		if NbPage := p.Args["NbPage"]; NbPage != nil {
			filter["NbPage"] = NbPage
		}
		if Author := p.Args["Author"]; Author != nil {
			filterauthor["Name"] = Author
			errAuthor := models.DB.Collection("author").FindOne(ctx, filterauthor).Decode(Authors)
			filter["Author"] = Authors.Id
			if errAuthor != nil {
				if errAuthor == mongo.ErrNoDocuments {
					log.Fatal(errAuthor)
					return nil, nil
				}
			}
		}
		if Category := p.Args["Category"]; Category != nil {
			filterCategory["name"] = Category
			errCategories := models.DB.Collection("categories").FindOne(ctx, filterCategory).Decode(categories)
			filter["Category"] = categories.Id
			if errCategories != nil {
				if errCategories == mongo.ErrNoDocuments {
					log.Fatal(errCategories)
					return nil, nil
				}
			}
		}
		if Publisher := p.Args["publisher"]; Publisher != nil {
			Publishers := &authorityModels.Publisher{}
			filterPublisher["filterPublisher"] = Publisher
			errPublishers := models.DB.Collection("publisher").FindOne(ctx, filterPublisher).Decode(Publishers)
			filter["publisher"] = Publishers.Id
			if errPublishers != nil {
				if errPublishers == mongo.ErrNoDocuments {
					log.Fatal(errPublishers)
					return nil, nil
				}
			}
		}

		//filter:=bson.M{}

		//filter["Original_language"] = Original_language
		//filterCategory["Category"] = Category

		fmt.Println("name", Authors.Name_Auth)

		fmt.Println("id", Authors.Id)

		cursor, errg := models.DB.Collection("Records").Find(ctx, filter)
		fmt.Println("name", Authors.Name_Auth)
		//Records.Outher=Outhers.Name
		fmt.Println("name", cursor)
		var results []*CatalogingModel.Record

		if errg != nil {
			if errg == mongo.ErrNoDocuments {
				log.Fatal(errg)
				return nil, nil
			}

		}
		if errg = cursor.All(ctx, &results); errg != nil {
			log.Fatal(errg)
		}
		fmt.Println(results)
		return results, nil
	},
}
