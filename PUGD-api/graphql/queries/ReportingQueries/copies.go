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

var GetCopy = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.CopyType),
	Args: graphql.FieldConfigArgument{
		"Title": &graphql.ArgumentConfig{
			Type: graphql.String,
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

		filterAuthor := bson.M{}
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
		if Title := p.Args["Title"]; Title != nil {
			filter["Title"] = Title
		}
		if Author := p.Args["Author"]; Author != nil {
			filterAuthor["Name"] = Author
			errAuthor := models.DB.Collection("author").FindOne(ctx, filterAuthor).Decode(Authors)
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
		if Publisher := p.Args["Publisher"]; Publisher != nil {
			Publishers := &authorityModels.Publisher{}
			filterPublisher["filterPublisher"] = Publisher
			errPublishers := models.DB.Collection("publisher").FindOne(ctx, filterPublisher).Decode(Publishers)
			filter["Publisher"] = Publishers.Id
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

		cursor, errg := models.DB.Collection("record").Find(ctx, filter)
		//fmt.Println("name", Outhers.Name)
		//Records.Outher=Outhers.Name
		fmt.Println("name", cursor)
		var results []*CatalogingModel.Record
		var copyRecord []*CatalogingModel.Copy
		var copies []*CatalogingModel.Copy
		if errg != nil {
			if errg == mongo.ErrNoDocuments {
				log.Fatal(errg)
				return nil, nil
			}

		}
		if errg = cursor.All(ctx, &results); errg != nil {
			log.Fatal(errg)
		}
		filtercopy := bson.M{}
		i := 0

		for i < len(results) {
			filtercopy["id_record"] = results[i].Id
			cursor1, errg := models.DB.Collection("Copy").Find(ctx, filtercopy)
			if errg = cursor1.All(ctx, &copyRecord); errg != nil {
				log.Fatal(errg)
			}
			copy(copies, copyRecord)
			//copys = copys+copy
			i += i
		}
		fmt.Println(results)
		return copyRecord, nil
	},
}
var GetCopyStatus = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.CopyType),
	Args: graphql.FieldConfigArgument{
		"Status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		//Records := &models.Records{}

		filter := bson.M{}

		Status := p.Args["Status"]

		//filter:=bson.M{}

		filter["Status"] = Status
		//filterCategory["Category"] = Category

		var results []*CatalogingModel.Copy

		cursor, errg := models.DB.Collection("Copy").Find(ctx, filter)
		if errg = cursor.All(ctx, &results); errg != nil {
			log.Fatal(errg)
		}

		if errg != nil {
			if errg == mongo.ErrNoDocuments {
				log.Fatal(errg)
				return nil, nil
			}

		}

		return results, nil
	},
}
