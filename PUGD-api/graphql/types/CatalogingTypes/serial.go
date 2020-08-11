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

var SerialType = graphql.NewObject(graphql.ObjectConfig{
	Name: "SerialType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.String,
		},
		"ISSN": &graphql.Field{
			Type: graphql.String,
		},
		"TitleProper": &graphql.Field{
			Type: graphql.String,
		},
		"OtherTitleInfo": &graphql.Field{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.Field{
			Type: graphql.String,
		},
		"RecYear": &graphql.Field{
			Type: graphql.Int,
		},
		"Type": &graphql.Field{
			Type: graphql.String,
		},
		"Summary": &graphql.Field{
			Type: graphql.String,
		},
		"VisibleInSerial": &graphql.Field{
			Type: graphql.Boolean,
		},
		"ViewSerialCheckIn": &graphql.Field{
			Type: graphql.Boolean,
		},
		"NoteOnContents": &graphql.Field{
			Type: graphql.String,
		},
		"GenetalNote": &graphql.Field{
			Type: graphql.String,
		},
		"Language": &graphql.Field{
			Type: graphql.NewList(LanguageType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Serial).Language

				var newlist []CatalogingModel.Language
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := utils.SearchLanguage(id)
						if resp == nil {
							log.Print("no doc ")
							return nil, ero
						} else {

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
				ids := p.Source.(*CatalogingModel.Serial).OriginalLanguage

				var newlist []CatalogingModel.Language
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")

						}

						resp, ero := utils.SearchLanguage(id)
						if resp == nil {
							log.Print("no doc ")
							return nil, ero
						} else {

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
				ids := p.Source.(*CatalogingModel.Serial).KeyWords

				var newlist []CatalogingModel.Keyword
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := utils.SearchKeyWord(id)
						if resp == nil {
							log.Print("no doc ")
							return nil, ero
						} else {

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
				ids := p.Source.(*CatalogingModel.Serial).Category

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
				ids := p.Source.(*CatalogingModel.Serial).Branches

				var newlist []CatalogingModel.Branch
				if ids != nil {

					for _, element := range ids {
						log.Printf("==>>>>>  %s ", element)

						id, err := primitive.ObjectIDFromHex(element.Hex())
						if err != nil {
							log.Print("no doc ")
						}

						resp, ero := CatalogingModel.FindBranchByID(id)
						if resp == nil {
							log.Print("no doc ")
							return nil, ero
						} else {

							newlist = append(newlist, *resp)

						}
					}
					return newlist, nil
				} else {
					return nil, nil
				}

			},
		},
		"Publishers": &graphql.Field{
			Type: authorityTypes.PublisherOutputType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id := p.Source.(*CatalogingModel.Serial).Publishers
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
				id := p.Source.(*CatalogingModel.Serial).OtherPublishers
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
		"Responsibility": &graphql.Field{
			Type: graphql.NewList(ResponsibilitySerialType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				Responsibilities := p.Source.(*CatalogingModel.Serial).Responsibility
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
		"ClassNumber": &graphql.Field{
			Type: graphql.NewList(authorityTypes.ClassNumberOutputType),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				ids := p.Source.(*CatalogingModel.Serial).ClassNumber

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
	},
})
var ResponsibilitySerialInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "ResponsibilitySerialInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"Author": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"Function": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
	},
})
var ResponsibilitySerialType = graphql.NewObject(graphql.ObjectConfig{
	Name: "ResponsibilitySerialType",
	Fields: graphql.Fields{
		"Author": &graphql.Field{
			Type: authorityTypes.AuthorTypeOutput,
		},
		"Function": &graphql.Field{
			Type: FunctionType,
		},
	},
})
