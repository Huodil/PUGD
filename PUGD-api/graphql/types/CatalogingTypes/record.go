package CatalogingTypes

import (
	"log"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var RecordType = graphql.NewObject(graphql.ObjectConfig{
	Name: "RecordType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
		"ISBN": &graphql.Field{
			Type: graphql.String,
		},
		"Title": &graphql.Field{
			Type: graphql.String,
		},
		"OtherTitle": &graphql.Field{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.Field{
			Type: graphql.String,
		},
		"RecYear": &graphql.Field{
			Type: graphql.Int,
		},
		"Price": &graphql.Field{
			Type: graphql.Int,
		},
		"Type": &graphql.Field{
			Type: graphql.String,
		},
		"EditionStatement": &graphql.Field{
			Type: graphql.String,
		},
		"OtherInformations": &graphql.Field{
			Type: graphql.String,
		},
		"Format": &graphql.Field{
			Type: graphql.String,
		},
		"Summary": &graphql.Field{
			Type: graphql.String,
		},
		"NoteOnContents": &graphql.Field{
			Type: graphql.String,
		},
		"ItemStatus": &graphql.Field{
			Type: graphql.String,
		},
		"IsNew": &graphql.Field{
			Type: graphql.Boolean,
		},
		"IsNum": &graphql.Field{
			Type: graphql.Boolean,
		},
		"AccMaterial": &graphql.Field{
			Type: graphql.String,
		},
		"NoteAuthor": &graphql.Field{
			Type: graphql.String,
		},
		"NbPages": &graphql.Field{
			Type: graphql.Int,
		},
		"FkSeries": &graphql.Field{
			Type: authorityTypes.SeriesOutputType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id := p.Source.(*CatalogingModel.Record).FkSeries
				log.Print("==>> ", id)
				filter := bson.M{}
				filter["_id"] = id
				Serie, ero := (&authorityModels.Series{}).FindMultiple(filter)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				if len(Serie) > 0 {
					return Serie[0], nil
				} else {
					return nil, ero
				}
			},
		},
		"FkSubSeries": &graphql.Field{
			Type: authorityTypes.SubSeriesOutputType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id := p.Source.(*CatalogingModel.Record).FkSubSeries
				log.Print("==>> ", id)
				filter := bson.M{}
				filter["_id"] = id
				FkSubSeries, ero := (&authorityModels.SubSeries{}).FindMultiple(filter)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				if len(FkSubSeries) > 0 {
					return FkSubSeries[0], nil
				} else {
					return nil, ero
				}
			},
		},
		"Baskets": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"Language": &graphql.Field{
			Type: graphql.NewList(LanguageType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).Language

				var newlist []CatalogingModel.Language
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := utils.SearchLanguage(id)
						if ero != nil {
							log.Print("no doc ")
						}
						log.Print("===N>>> ", resp)

						if ero == nil {

							newlist = append(newlist, *resp)

						}
					}
					return newlist, nil
				} else {
					return nil, nil
				}

			},
		},
		"OriginalLanguage": &graphql.Field{
			Type: graphql.NewList(LanguageType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).OriginalLanguage

				var newlist []CatalogingModel.Language
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := utils.SearchLanguage(id)
						if ero != nil {
							log.Print("no doc ")
						}
						log.Print("===N>>> ", resp)

						if ero == nil {

							newlist = append(newlist, *resp)

						}
					}
					return newlist, nil
				} else {
					return nil, nil
				}

			},
		},
		"KeyWords": &graphql.Field{
			Type: graphql.NewList(KeyWordType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).KeyWords

				var newlist []CatalogingModel.Keyword
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := utils.SearchKeyWord(id)
						if ero != nil {
							log.Print("no doc ")
						}
						log.Print("===N>>> ", resp)

						if ero == nil {

							newlist = append(newlist, *resp)

						}
					}
					return newlist, nil
				} else {
					return nil, nil
				}

			},
		},
		"Category": &graphql.Field{
			Type: graphql.NewList(authorityTypes.CategoryOutputType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).Category

				var newlist []bson.M
				for _, element := range ids {
					log.Printf("==>>>>>  %s ", element)
					filter := bson.M{}
					filter["_id"] = element
					resp, ero := (&authorityModels.Category{}).FindMultiple(filter)
					if ero != nil {
						log.Print("no doc ")
					}
					log.Print("===N>>> ", resp)

					if resp != nil {
						for _, value := range resp {
							newlist = append(newlist, value)
						}
					}
				}
				return newlist, nil
			},
		},
		"Branches": &graphql.Field{
			Type: graphql.NewList(BranchType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).Branches

				var newlist []CatalogingModel.Branch
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := CatalogingModel.FindBranchByID(id)
						if ero != nil {
							log.Print("no doc ")
						}
						log.Print("===N>>> ", resp)

						if ero == nil {

							newlist = append(newlist, *resp)

						}
					}
					return newlist, nil
				} else {
					return nil, nil
				}

			},
		},
		"Copies": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"Publishers": &graphql.Field{
			Type: authorityTypes.PublisherOutputType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id := p.Source.(*CatalogingModel.Record).Publishers
				log.Print("==>> ", id)
				filter := bson.M{}
				filter["_id"] = id
				Publishers, ero := (&authorityModels.Publisher{}).FindMultiple(filter)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				if len(Publishers) > 0 {
					return Publishers[0], nil
				} else {
					return nil, ero
				}
			},
		},
		"OtherPublishers": &graphql.Field{
			Type: authorityTypes.PublisherOutputType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id := p.Source.(*CatalogingModel.Record).OtherPublishers
				log.Print("==>> ", id)
				filter := bson.M{}
				filter["_id"] = id
				Publishers, ero := (&authorityModels.Publisher{}).FindMultiple(filter)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				if len(Publishers) > 0 {
					return Publishers[0], nil
				} else {
					return nil, ero
				}
			},
		},
		"CollectionTitle": &graphql.Field{
			Type: graphql.NewList(authorityTypes.UniformTitleTypeAuthorities),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).CollectionTitle

				var newlist []bson.M
				for _, element := range ids {
					log.Printf("==>>>>>  %s ", element)
					filter := bson.M{}
					filter["_id"] = element
					resp, ero := (&authorityModels.UniformTitle{}).FindMultiple(filter)
					if ero != nil {
						log.Print("no doc ")
					}
					log.Print("===N>>> ", resp)

					if resp != nil {
						for _, value := range resp {
							newlist = append(newlist, value)
						}
					}
				}
				return newlist, nil
			},
		},

		"ClassNumber": &graphql.Field{
			Type: graphql.NewList(authorityTypes.ClassNumberOutputType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Record).ClassNumber

				var newlist []bson.M
				for _, element := range ids {
					log.Printf("==>>>>>  %s ", element)
					filter := bson.M{}
					filter["_id"] = element
					resp, ero := (&authorityModels.ClassNumber{}).FindMultiple(filter)
					if ero != nil {
						log.Print("no doc ")
					}
					log.Print("===N>>> ", resp)

					if resp != nil {
						for _, value := range resp {
							newlist = append(newlist, value)
						}
					}
				}
				return newlist, nil
			},
		},

		"Responsibility": &graphql.Field{
			Type: graphql.NewList(ResponsibilityType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				Responsibilities := p.Source.(*CatalogingModel.Record).Responsibility
				log.Print("=____________________________________")
				log.Print("===resp>>> ", Responsibilities)
				var ListOfResponsibilities []map[string]bson.M
				for _, element := range Responsibilities {
					OneResponsibility := make(map[string]bson.M)
					filterAuthor := bson.M{}
					filterAuthor["_id"] = element["Author"].(primitive.ObjectID)
					log.Print("===author>>> ", element["Author"])
					log.Print("===function>>> ", element["Function"])
					authors, ero1 := (&authorityModels.Author{}).FindMultiple(filterAuthor, 0, 0)

					if ero1 != nil {
						log.Print("no doc ")
					}
					functions, ero2 := utils.SearchFunction(element["Function"].(primitive.ObjectID))
					log.Print("heyyyyyyyyyyyyyyyyyy ", functions)
					if ero2 != nil {
						log.Print("no fun ")
					}

					if authors != nil {
						for _, value := range authors {
							OneResponsibility["Author"] = value
						}
					}
					if functions != nil {

						OneResponsibility["Function"] = *functions

					}

					log.Print("===resp final>>> ", OneResponsibility)
					ListOfResponsibilities = append(ListOfResponsibilities, OneResponsibility)
				}
				return ListOfResponsibilities, nil
			},
		},
	},
})
var ResponsibilityType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ResponsibilityType",
	Fields: graphql.Fields{
		"Author": &graphql.Field{
			Type: authorityTypes.AuthorTypeOutput,
		},
		"Function": &graphql.Field{
			Type: FunctionType,
		},
	},
})

var ResponsibilityInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "ResponsibilityInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"Author": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"Function": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
	},
})
