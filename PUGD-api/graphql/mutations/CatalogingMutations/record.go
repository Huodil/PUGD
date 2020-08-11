package CatalogingMutations

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneRecord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"EditionStatement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherInformations": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Format": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Summary": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteOnContents": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ItemStatus": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"IsNew": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"IsNum": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"Price": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"AccMaterial": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteAuthor": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NbPages": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"FkSeries": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"FkSubSeries": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Language": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"OriginalLanguage": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"KeyWords": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Category": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Branches": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherPublisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CollectionTitle": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"ClassNumber": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Responsibility": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		isbn := p.Args["isbn"]
		title := p.Args["title"]
		OtherTitle := p.Args["OtherTitle"]
		ParallelTitle := p.Args["ParallelTitle"]
		RecYear := p.Args["RecYear"]
		Price := p.Args["Price"]
		Type := p.Args["Type"]
		EditionStatement := p.Args["EditionStatement"]
		OtherInformations := p.Args["OtherInformations"]
		Format := p.Args["Format"]
		Summary := p.Args["Summary"]
		IsNew := p.Args["IsNew"]
		IsNum := p.Args["IsNum"]
		AccMaterial := p.Args["AccMaterial"]
		NoteAuthor := p.Args["NoteAuthor"]
		NbPages := p.Args["NbPages"]
		NoteOnContents := p.Args["NoteOnContents"]
		ItemStatus := p.Args["ItemStatus"]
		Responsibilities := p.Args["Responsibility"]
		// ***
		var FkSeries primitive.ObjectID
		if p.Args["FkSeries"] != nil {

			FkSeries1, err1 := primitive.ObjectIDFromHex(p.Args["FkSeries"].(string))
			if err1 != nil {
				return nil, err1
			}
			FkSeries = FkSeries1
		}
		// ***
		var Publishers primitive.ObjectID
		if p.Args["Publisher"] != nil {

			Publishers1, err1 := primitive.ObjectIDFromHex(p.Args["Publisher"].(string))
			if err1 != nil {
				return nil, err1
			}
			Publishers = Publishers1
		}
		// ***
		var OtherPublishers primitive.ObjectID
		if p.Args["OtherPublisher"] != nil {

			OtherPublishers1, err1 := primitive.ObjectIDFromHex(p.Args["OtherPublisher"].(string))
			if err1 != nil {
				return nil, err1
			}
			OtherPublishers = OtherPublishers1
		}
		// ***
		var FkSubSeries primitive.ObjectID
		if p.Args["FkSubSeries"] != nil {

			FkSubSeries1, err2 := primitive.ObjectIDFromHex(p.Args["FkSubSeries"].(string))
			if err2 != nil {
				return nil, err2
			}
			FkSubSeries = FkSubSeries1
		}
		if isbn == nil {
			isbn = ""
		}
		if title == nil {
			title = ""
		}
		if OtherTitle == nil {
			OtherTitle = ""
		}
		if NoteOnContents == nil {
			NoteOnContents = ""
		}
		if ItemStatus == nil {
			ItemStatus = ""
		}
		if ParallelTitle == nil {
			ParallelTitle = ""
		}
		if RecYear == nil {
			RecYear = 0
		}
		if EditionStatement == nil {
			EditionStatement = ""
		}
		if OtherInformations == nil {
			OtherInformations = ""
		}
		if Format == nil {
			Format = ""
		}
		if Summary == nil {
			Summary = ""
		}
		if Price == nil {
			Price = 0
		}
		if Type == nil {
			Type = "printed text"
		}
		if IsNew == nil {
			IsNew = false
		}
		if IsNum == nil {
			IsNum = false
		}
		if AccMaterial == nil {
			AccMaterial = ""
		}
		if NoteAuthor == nil {
			NoteAuthor = ""
		}
		if NbPages == nil {
			NbPages = 0
		}
		// make an objectID list out of the an argument
		var ObjectIDLanguage []primitive.ObjectID
		if p.Args["Language"] != nil {
			ObjectIDLanguage = utils.MakeSliceOfIDs(p.Args["Language"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDOriginalLanguage []primitive.ObjectID
		if p.Args["OriginalLanguage"] != nil {
			ObjectIDOriginalLanguage = utils.MakeSliceOfIDs(p.Args["OriginalLanguage"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDKeyWords []primitive.ObjectID
		if p.Args["KeyWords"] != nil {
			ObjectIDKeyWords = utils.MakeSliceOfIDs(p.Args["KeyWords"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDCategory []primitive.ObjectID
		if p.Args["Category"] != nil {
			ObjectIDCategory = utils.MakeSliceOfIDs(p.Args["Category"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDBranches []primitive.ObjectID
		if p.Args["Branches"] != nil {
			ObjectIDBranches = utils.MakeSliceOfIDs(p.Args["Branches"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDCollectionTitle []primitive.ObjectID
		if p.Args["CollectionTitle"] != nil {
			ObjectIDCollectionTitle = utils.MakeSliceOfIDs(p.Args["CollectionTitle"].([]interface{}))
		}
		// make an objectID list out of the an argument
		var ObjectIDClassNumber []primitive.ObjectID
		if p.Args["ClassNumber"] != nil {
			ObjectIDClassNumber = utils.MakeSliceOfIDs(p.Args["ClassNumber"].([]interface{}))
		}
		var ListOfResponsibilities []map[string]interface{}
		if p.Args["Responsibility"] != nil {
			for _, value := range Responsibilities.([]interface{}) {
				OneResponsibility := make(map[string]interface{})
				val := strings.Split(value.(string), "|")
				if len(val) > 0 {
					ObjectID1, err := primitive.ObjectIDFromHex(val[0])

					if err != nil {
						return nil, err
					}
					OneResponsibility["Author"] = ObjectID1
				}
				if len(val) > 1 {
					ObjectID2, err := primitive.ObjectIDFromHex(val[1])

					if err != nil {
						return nil, err
					}
					OneResponsibility["Function"] = ObjectID2
				}
				ListOfResponsibilities = append(ListOfResponsibilities, OneResponsibility)
			}
		}

		record := CatalogingModel.Record{
			ISBN:              isbn.(string),
			Title:             title.(string),
			OtherTitle:        OtherTitle.(string),
			ParallelTitle:     ParallelTitle.(string),
			RecYear:           RecYear.(int),
			EditionStatement:  EditionStatement.(string),
			OtherInformations: OtherInformations.(string),
			Format:            Format.(string),
			Summary:           Summary.(string),
			ItemStatus:        ItemStatus.(string),
			NoteOnContents:    NoteOnContents.(string),
			Price:             Price.(int),
			Type:              Type.(string),
			IsNew:             IsNew.(bool),
			IsNum:             IsNum.(bool),
			AccMaterial:       AccMaterial.(string),
			NoteAuthor:        NoteAuthor.(string),
			NbPages:           NbPages.(int),
			FkSeries:          FkSeries,
			FkSubSeries:       FkSubSeries,
			Language:          ObjectIDLanguage,
			OriginalLanguage:  ObjectIDOriginalLanguage,
			KeyWords:          ObjectIDKeyWords,
			Category:          ObjectIDCategory,
			Branches:          ObjectIDBranches,
			Publishers:        Publishers,
			OtherPublishers:   OtherPublishers,
			CollectionTitle:   ObjectIDCollectionTitle,
			ClassNumber:       ObjectIDClassNumber,
			Responsibility:    ListOfResponsibilities,
		}
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("records")
		result, err2 := coll.InsertOne(ctx, record)
		if err2 != nil {
			log.Fatal(err2)
		}
		//update Branches
		if p.Args["Branches"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDBranches); i++ {
				//get the list of serials in branch
				branches := utils.SearchBranch(ObjectIDBranches[i])
				if branches != nil {
					records = branches.Records
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateBranchIDs(ObjectIDBranches[i], "records", append(records, result.InsertedID.(primitive.ObjectID)))

					}
				}
			}
		}
		//update Languages
		if p.Args["Language"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDLanguage); i++ {
				//get the list of serials in languages
				Languages, err := utils.SearchLanguage(ObjectIDLanguage[i])
				if err != nil {
					log.Print("no doc ")
				}
				if Languages != nil {
					records = Languages.Records
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateLanguageIDs(ObjectIDLanguage[i], "records", append(records, result.InsertedID.(primitive.ObjectID)))

					}
				}
			}
		}
		//update OriginalLanguage
		if p.Args["OriginalLanguage"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDOriginalLanguage); i++ {
				//get the list of serials in Original Language
				OriginalLanguage, err := utils.SearchLanguage(ObjectIDOriginalLanguage[i])

				if err != nil {
					log.Print("no doc ")
				}
				if OriginalLanguage != nil {
					records = OriginalLanguage.Records
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateLanguageIDs(ObjectIDOriginalLanguage[i], "records", append(records, result.InsertedID.(primitive.ObjectID)))

					}
				}
			}
		}
		//update KeyWords
		if p.Args["KeyWords"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDKeyWords); i++ {
				//get the list of serials in keyword
				KeyWords, ero := utils.SearchKeyWord(ObjectIDKeyWords[i])
				if ero != nil {
					log.Print("no doc ")
				}
				if KeyWords != nil {
					records = KeyWords.Records
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateKeyWordIDs(ObjectIDKeyWords[i], "records", append(records, result.InsertedID.(primitive.ObjectID)))

					}
				}
			}
		}
		//update categories
		if p.Args["Category"] != nil {
			var record []primitive.ObjectID
			for i := 0; i < len(ObjectIDCategory); i++ {
				//get the list of records in category
				category := authorityModels.Category{}
				filter := bson.M{}
				filter["_id"] = ObjectIDCategory[i]
				c, _ := (&authorityModels.Category{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &category); err != nil {
						fmt.Println(err)
					}
					record = category.Record
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), record) {
						utils.UpdateCategoryIDs(ObjectIDCategory[i], "record", append(record, result.InsertedID.(primitive.ObjectID)))
					}
				}
			}
		}
		//update uniform title
		if p.Args["CollectionTitle"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDCollectionTitle); i++ {
				//get the list of records in uniform title
				uniformtitle := authorityModels.UniformTitle{}
				filter := bson.M{}
				filter["_id"] = ObjectIDCollectionTitle[i]
				c, _ := (&authorityModels.UniformTitle{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &uniformtitle); err != nil {
						fmt.Println(err)
					}
					records = uniformtitle.Record
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateUniformTitleIDs(ObjectIDCollectionTitle[i], "record", append(records, result.InsertedID.(primitive.ObjectID)))
					}
				}
			}
		}
		//update class number
		if p.Args["ClassNumber"] != nil {
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDClassNumber); i++ {
				//get the list of records in category
				classnumber := authorityModels.ClassNumber{}
				filter := bson.M{}
				filter["_id"] = ObjectIDClassNumber[i]
				c, _ := (&authorityModels.ClassNumber{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &classnumber); err != nil {
						fmt.Println(err)
					}
					records = classnumber.Record
					//append the id
					if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
						utils.UpdateClassNumberIDs(ObjectIDClassNumber[i], "record", append(records, result.InsertedID.(primitive.ObjectID)))
					}
				}
			}
		}
		//update publisher
		if p.Args["Publishers"] != nil {
			var records []primitive.ObjectID
			//get the list of records in category
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = Publishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				records = publisher.Record
				//append the id
				if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
					utils.UpdatePublisherIDs(Publishers, "record", append(records, result.InsertedID.(primitive.ObjectID)))
				}
			}
		}
		//update other publisher
		if p.Args["OtherPublishers"] != nil {
			var records []primitive.ObjectID
			//get the list of records in category
			Otherpublisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = OtherPublishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &Otherpublisher); err != nil {
					fmt.Println(err)
				}
				records = Otherpublisher.RecordOtherPublisher
				//append the id
				if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
					utils.UpdatePublisherIDs(Publishers, "recordotherpublisher", append(records, result.InsertedID.(primitive.ObjectID)))
				}
			}
		}
		//update serie
		if p.Args["FkSeries"] != nil {
			var records []primitive.ObjectID
			//get the list of records in category
			series := authorityModels.Series{}
			filter := bson.M{}
			filter["_id"] = FkSeries
			c, _ := (&authorityModels.Series{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &series); err != nil {
					fmt.Println(err)
				}
				records = series.Record
				//append the id
				if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
					utils.UpdateSerieIDs(FkSeries, "record", append(records, result.InsertedID.(primitive.ObjectID)))
				}
			}
		}
		//update sub serie
		if p.Args["FkSubSeries"] != nil {
			var records []primitive.ObjectID
			//get the list of records in category
			series := authorityModels.SubSeries{}
			filter := bson.M{}
			filter["_id"] = FkSubSeries
			c, _ := (&authorityModels.SubSeries{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &series); err != nil {
					fmt.Println(err)
				}
				records = series.Record
				//append the id
				if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), records) {
					utils.UpdateSubSerieIDs(FkSubSeries, "record", append(records, result.InsertedID.(primitive.ObjectID)))
				}
			}
		}
		return result.InsertedID.(primitive.ObjectID), nil
	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneRecord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"EditionStatement": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherInformations": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Format": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Summary": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteOnContents": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ItemStatus": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"IsNew": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"IsNum": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"AccMaterial": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteAuthor": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NbPages": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"FkSeries": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"FkSubSeries": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Language": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"OriginalLanguage": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"KeyWords": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Category": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Branches": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Publisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherPublisher": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CollectionTitle": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"ClassNumber": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Responsibility": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("records")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		isbn := p.Args["isbn"]
		title := p.Args["title"]
		OtherTitle := p.Args["OtherTitle"]
		ParallelTitle := p.Args["ParallelTitle"]
		RecYear := p.Args["RecYear"]
		EditionStatement := p.Args["EditionStatement"]
		OtherInformations := p.Args["OtherInformations"]
		Format := p.Args["Format"]
		Summary := p.Args["Summary"]
		NoteOnContents := p.Args["NoteOnContents"]
		ItemStatus := p.Args["ItemStatus"]
		IsNew := p.Args["IsNew"]
		IsNum := p.Args["IsNum"]
		AccMaterial := p.Args["AccMaterial"]
		NoteAuthor := p.Args["NoteAuthor"]
		NbPages := p.Args["NbPages"]
		Price := p.Args["Price"]
		Type := p.Args["Type"]
		Responsibilities := p.Args["Responsibility"]
		recordUpdate := bson.M{}

		if isbn != nil {
			recordUpdate["isbn"] = isbn
		}
		if title != nil {
			recordUpdate["title"] = title
		}
		if Price != nil {
			recordUpdate["price"] = Price
		}
		if Type != nil {
			recordUpdate["type"] = Type
		}
		if OtherTitle != nil {
			recordUpdate["othertitle"] = OtherTitle
		}
		if ParallelTitle != nil {
			recordUpdate["paralleltitle"] = ParallelTitle
		}
		if RecYear != nil {
			recordUpdate["recyear"] = RecYear
		}
		if EditionStatement != nil {
			recordUpdate["editionstatement"] = EditionStatement
		}
		if OtherInformations != nil {
			recordUpdate["otherinformations"] = OtherInformations
		}
		if Format != nil {
			recordUpdate["format"] = Format
		}
		if Summary != nil {
			recordUpdate["summary"] = Summary
		}
		if NoteOnContents == nil {
			recordUpdate["noteoncontents"] = NoteOnContents
		}
		if ItemStatus == nil {
			recordUpdate["itemstatus"] = ItemStatus
		}
		if IsNew != nil {
			recordUpdate["isnew"] = IsNew
		}
		if IsNum != nil {
			recordUpdate["isnum"] = IsNum
		}
		if AccMaterial != nil {
			recordUpdate["accmaterial"] = AccMaterial
		}
		if NoteAuthor != nil {
			recordUpdate["noteauthor"] = NoteAuthor
		}
		if NbPages != nil {
			recordUpdate["nbpages"] = NbPages
		}
		// ***
		record := utils.SearchRecord(_id)
		//***
		var FkSeries primitive.ObjectID
		var DeletedSeries primitive.ObjectID
		if p.Args["FkSeries"] != nil {
			var FkSeries primitive.ObjectID
			FkSeries, err1 := primitive.ObjectIDFromHex(p.Args["FkSeries"].(string))
			if err1 != nil {
				return nil, err1
			}
			recordUpdate["fkseries"] = FkSeries
			// store the deleted publisher
			if FkSeries != record.FkSeries {
				DeletedSeries = record.FkSeries
			}
		}
		//***
		var FkSubSeries primitive.ObjectID
		var DeletedSubSeries primitive.ObjectID
		if p.Args["FkSubSeries"] != nil {
			var FkSubSeries primitive.ObjectID
			FkSubSeries, err1 := primitive.ObjectIDFromHex(p.Args["FkSubSeries"].(string))
			if err1 != nil {
				return nil, err1
			}
			recordUpdate["fksubseries"] = FkSubSeries
			// store the deleted publisher
			if FkSubSeries != record.FkSubSeries {
				DeletedSubSeries = record.FkSubSeries
			}
		}
		// ***
		// update the publisher and store the deleted one
		var deletedPublisher primitive.ObjectID
		var Publisher primitive.ObjectID
		if p.Args["Publishers"] != nil {

			Publisher, err1 := primitive.ObjectIDFromHex(p.Args["Publishers"].(string))
			if err1 != nil {
				return nil, err1
			}
			recordUpdate["publishers"] = Publisher
			// store the deleted publisher
			if Publisher != record.OtherPublishers {
				deletedPublisher = record.OtherPublishers
			}
		}

		// update the other publisher and store the deleted one
		var deletedOtherPublisher primitive.ObjectID
		var OtherPublisher primitive.ObjectID
		if p.Args["OtherPublishers"] != nil {
			OtherPublisher, err1 := primitive.ObjectIDFromHex(p.Args["OtherPublishers"].(string))
			if err1 != nil {
				return nil, err1
			}
			recordUpdate["otherpublishers"] = OtherPublisher
			// store the deleted other publisher
			if OtherPublisher != record.OtherPublishers {
				deletedOtherPublisher = record.OtherPublishers
			}
		}
		// ***

		var ObjectIDBranches []primitive.ObjectID
		var deletedBranches []primitive.ObjectID
		if p.Args["Branches"] != nil {
			// make an objectID list out of the an argument
			ObjectIDBranches = utils.MakeSliceOfIDs(p.Args["Branches"].([]interface{}))
			recordUpdate["branches"] = ObjectIDBranches
			// make an objectId list of the deleted branches
			deletedBranches = utils.DeletedIDs(record.Branches, ObjectIDBranches)
		}

		var ObjectIDLanguage []primitive.ObjectID
		var deletedLanguages []primitive.ObjectID
		if p.Args["Language"] != nil {
			// make an objectID list out of the an argument
			ObjectIDLanguage = utils.MakeSliceOfIDs(p.Args["Language"].([]interface{}))
			recordUpdate["language"] = ObjectIDLanguage
			// make an objectId list of the deleted Languages
			deletedLanguages = utils.DeletedIDs(record.Language, ObjectIDLanguage)

		}

		var ObjectIDOriginalLanguage []primitive.ObjectID
		var deletedOriginalLanguages []primitive.ObjectID
		if p.Args["OriginalLanguage"] != nil {
			// make an objectID list out of the an argument
			ObjectIDOriginalLanguage = utils.MakeSliceOfIDs(p.Args["OriginalLanguage"].([]interface{}))
			recordUpdate["originallanguage"] = ObjectIDOriginalLanguage
			// make an objectId list of the deleted OriginalLanguages
			deletedOriginalLanguages = utils.DeletedIDs(record.OriginalLanguage, ObjectIDOriginalLanguage)
		}

		var ObjectIDKeyWord []primitive.ObjectID
		var deletedKeyWords []primitive.ObjectID
		if p.Args["KeyWords"] != nil {
			// make an objectID list out of the an argument
			ObjectIDKeyWord = utils.MakeSliceOfIDs(p.Args["KeyWords"].([]interface{}))
			recordUpdate["keywords"] = ObjectIDKeyWord
			// make an objectId list of the deleted KeyWords
			deletedKeyWords = utils.DeletedIDs(record.KeyWords, ObjectIDKeyWord)
		}

		//update the class numbers and store the deleted ones
		var ObjectIDClassNumber []primitive.ObjectID
		var DeletedClassNumbers []primitive.ObjectID
		if p.Args["ClassNumber"] != nil {
			// make an objectID list out of the an argument
			ObjectIDClassNumber = utils.MakeSliceOfIDs(p.Args["ClassNumber"].([]interface{}))
			recordUpdate["classnumber"] = ObjectIDClassNumber
			// make an objectId list of the deleted classnumbers
			deletedKeyWords = utils.DeletedIDs(record.ClassNumber, ObjectIDClassNumber)
		}

		var ObjectIDCollectionTitle []primitive.ObjectID
		var deletedCollectionTitle []primitive.ObjectID
		if p.Args["CollectionTitle"] != nil {
			// make an objectID list out of the an argument
			ObjectIDCollectionTitle = utils.MakeSliceOfIDs(p.Args["CollectionTitle"].([]interface{}))
			recordUpdate["collectiontitle"] = ObjectIDCollectionTitle
			// make an objectId list of the deleted classnumbers
			deletedCollectionTitle = utils.DeletedIDs(record.CollectionTitle, ObjectIDCollectionTitle)
		}

		// update the categoties and store the deleted ones
		var ObjectIDCategory []primitive.ObjectID
		var DeletedCategories []primitive.ObjectID
		if p.Args["Category"] != nil {
			// make an objectID list out of the an argument
			ObjectIDCategory = utils.MakeSliceOfIDs(p.Args["Category"].([]interface{}))
			recordUpdate["category"] = ObjectIDCategory
			// make an objectId list of the deleted classnumbers
			DeletedCategories = utils.DeletedIDs(record.Category, ObjectIDCategory)
		}

		var ListOfResponsibilities []map[string]interface{}
		if p.Args["Responsibility"] != nil {
			for _, value := range Responsibilities.([]interface{}) {
				OneResponsibility := make(map[string]interface{})
				val := strings.Split(value.(string), "|")
				if len(val) > 0 {
					ObjectID1, err := primitive.ObjectIDFromHex(val[0])

					if err != nil {
						return nil, err
					}
					OneResponsibility["Author"] = ObjectID1
				}
				if len(val) > 1 {
					ObjectID2, err := primitive.ObjectIDFromHex(val[1])

					if err != nil {
						return nil, err
					}
					OneResponsibility["Function"] = ObjectID2
				}
				ListOfResponsibilities = append(ListOfResponsibilities, OneResponsibility)
			}
			recordUpdate["responsibility"] = ListOfResponsibilities
		}
		// do the update
		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": recordUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}

		if p.Args["Branches"] != nil {
			//update Branches
			for i := 0; i < len(ObjectIDBranches); i++ {
				//get the list of records in branch
				branches := utils.SearchBranch(ObjectIDBranches[i])
				if branches != nil {
					record := branches.Records
					//append the id
					if utils.ObjectIDNotInSlice(_id, record) {
						_ = utils.UpdateBranchIDs(ObjectIDBranches[i], "records", append(record, _id))

					}
				}
			}
			// remove the deleted records
			if len(deletedBranches) > 0 {
				for j := 0; j < len(deletedBranches); j++ {
					branches := utils.SearchBranch(deletedBranches[j])
					if branches != nil {
						records := utils.DeleteFromSliceOfIds(_id, branches.Records)
						_ = utils.UpdateBranchIDs(deletedBranches[j], "records", records)
					}
				}
			}
		}

		if p.Args["Language"] != nil {
			//update Languages
			for i := 0; i < len(ObjectIDLanguage); i++ {
				//get the list of records in Language
				Languages, _ := utils.SearchLanguage(ObjectIDLanguage[i])
				if Languages != nil {
					record := Languages.Records
					//append the id
					if utils.ObjectIDNotInSlice(_id, record) {
						_ = utils.UpdateLanguageIDs(ObjectIDLanguage[i], "records", append(record, _id))

					}
				}
			}
			// remove the deleted Languages
			if len(deletedLanguages) > 0 {
				for j := 0; j < len(deletedLanguages); j++ {
					Languages, _ := utils.SearchLanguage(deletedLanguages[j])
					if Languages != nil {
						records := utils.DeleteFromSliceOfIds(_id, Languages.Records)
						_ = utils.UpdateLanguageIDs(deletedLanguages[j], "records", records)
					}
				}
			}
		}

		if p.Args["OriginalLanguage"] != nil {
			//update OriginalLanguages
			for i := 0; i < len(ObjectIDOriginalLanguage); i++ {
				//get the list of records in branch
				OriginalLanguage, _ := utils.SearchLanguage(ObjectIDOriginalLanguage[i])
				if OriginalLanguage != nil {
					record := OriginalLanguage.Records
					//append the id
					if utils.ObjectIDNotInSlice(_id, record) {
						_ = utils.UpdateLanguageIDs(ObjectIDOriginalLanguage[i], "records", append(record, _id))

					}
				}
			}
			// remove the deleted OriginalLanguages
			if len(deletedOriginalLanguages) > 0 {
				for j := 0; j < len(deletedOriginalLanguages); j++ {
					OriginalLanguages, _ := utils.SearchLanguage(deletedOriginalLanguages[j])
					if OriginalLanguages != nil {
						records := utils.DeleteFromSliceOfIds(_id, OriginalLanguages.Records)
						_ = utils.UpdateLanguageIDs(deletedOriginalLanguages[j], "records", records)
					}
				}
			}
		}

		if p.Args["KeyWords"] != nil {
			//update Branches
			for i := 0; i < len(ObjectIDKeyWord); i++ {
				//get the list of records in KeyWord
				KeyWords, _ := utils.SearchKeyWord(ObjectIDKeyWord[i])
				if KeyWords != nil {
					record := KeyWords.Records
					//append the id
					if utils.ObjectIDNotInSlice(_id, record) {
						_ = utils.UpdateKeyWordIDs(ObjectIDKeyWord[i], "records", append(record, _id))

					}
				}
			}
			// remove the deleted KeyWords
			if len(deletedKeyWords) > 0 {
				for j := 0; j < len(deletedKeyWords); j++ {
					KeyWords, _ := utils.SearchKeyWord(deletedKeyWords[j])
					if KeyWords != nil {
						records := utils.DeleteFromSliceOfIds(_id, KeyWords.Records)
						_ = utils.UpdateKeyWordIDs(deletedKeyWords[j], "records", records)
					}
				}
			}
		}
		//***
		if p.Args["Category"] != nil {
			//update category
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDCategory); i++ {
				//get the list of serials in category
				category := authorityModels.Category{}
				filter := bson.M{}
				filter["_id"] = ObjectIDCategory[i]
				c, _ := (&authorityModels.Category{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &category); err != nil {
						fmt.Println(err)
					}
					records = category.Record
					//append the id
					if utils.ObjectIDNotInSlice(_id, records) {
						utils.UpdateCategoryIDs(ObjectIDCategory[i], "record", append(records, _id))
					}
				}
			}
			// remove the deleted categories
			if len(DeletedCategories) > 0 {
				for j := 0; j < len(DeletedCategories); j++ {
					category := authorityModels.Category{}
					filter := bson.M{}
					filter["_id"] = DeletedCategories[j]
					c, _ := (&authorityModels.Category{}).FindMultiple(filter)
					if c != nil {
						jsonbody, err := json.Marshal(c)
						if err != nil {
							fmt.Println(err)
						}
						if err := json.Unmarshal(jsonbody, &category); err != nil {
							fmt.Println(err)
						}

						records := utils.DeleteFromSliceOfIds(_id, category.Record)
						_ = utils.UpdateCategoryIDs(DeletedCategories[j], "record", records)
					}
				}
			}
		}
		//***
		if p.Args["ClassNumber"] != nil {
			//update class number
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDClassNumber); i++ {
				//get the list of serials in category
				classnumber := authorityModels.ClassNumber{}
				filter := bson.M{}
				filter["_id"] = ObjectIDClassNumber[i]
				c, _ := (&authorityModels.ClassNumber{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &classnumber); err != nil {
						fmt.Println(err)
					}
					records = classnumber.Record
					//append the id
					if utils.ObjectIDNotInSlice(_id, records) {
						utils.UpdateClassNumberIDs(ObjectIDClassNumber[i], "record", append(records, _id))
					}
				}
			}
			// remove the deleted class numbers
			if len(DeletedClassNumbers) > 0 {
				for j := 0; j < len(DeletedClassNumbers); j++ {
					classnumber := authorityModels.ClassNumber{}
					filter := bson.M{}
					filter["_id"] = DeletedClassNumbers[j]
					c, _ := (&authorityModels.ClassNumber{}).FindMultiple(filter)
					if c != nil {
						jsonbody, err := json.Marshal(c)
						if err != nil {
							fmt.Println(err)
						}
						if err := json.Unmarshal(jsonbody, &classnumber); err != nil {
							fmt.Println(err)
						}

						records := utils.DeleteFromSliceOfIds(_id, classnumber.Record)
						_ = utils.UpdateClassNumberIDs(DeletedClassNumbers[j], "record", records)
					}
				}
			}
		}
		//***
		if p.Args["Publishers"] != nil {
			//update publisher
			var records []primitive.ObjectID
			//get the list of series from publisher
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = Publisher
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				//append the id

				records = publisher.Record
				if utils.ObjectIDNotInSlice(_id, records) {
					_ = utils.UpdatePublisherIDs(Publisher, "record", append(records, _id))
				}
			}
			// remove the deleted publisher
			if deletedPublisher != Publisher {
				//get the list of series from publisher
				publisher := authorityModels.Publisher{}
				filter := bson.M{}
				filter["_id"] = deletedPublisher
				c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &publisher); err != nil {
						fmt.Println(err)
					}

					records := utils.DeleteFromSliceOfIds(_id, publisher.Record)
					_ = utils.UpdatePublisherIDs(deletedPublisher, "record", records)
				}
			}
		}
		//***
		if p.Args["OtherPublishers"] != nil {
			//update other publisher
			var records []primitive.ObjectID
			//get the list of series from publisher
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = OtherPublisher
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				//append the id

				records = publisher.RecordOtherPublisher
				if utils.ObjectIDNotInSlice(_id, records) {
					_ = utils.UpdatePublisherIDs(Publisher, "recordotherpublisher", append(records, _id))
				}
			}
			// remove the deleted publisher
			if deletedOtherPublisher != Publisher {
				//get the list of series from publisher
				publisher := authorityModels.Publisher{}
				filter := bson.M{}
				filter["_id"] = deletedOtherPublisher
				c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &publisher); err != nil {
						fmt.Println(err)
					}
					records := utils.DeleteFromSliceOfIds(_id, publisher.RecordOtherPublisher)
					_ = utils.UpdatePublisherIDs(deletedOtherPublisher, "recordotherpublisher", records)
				}
			}
		}
		//***
		if p.Args["FkSeries"] != nil {
			//update series
			var records []primitive.ObjectID
			//get the list of records from serie
			series := authorityModels.Series{}
			filter := bson.M{}
			filter["_id"] = FkSeries
			c, _ := (&authorityModels.Series{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &series); err != nil {
					fmt.Println(err)
				}
				//append the id

				records = series.Record
				if utils.ObjectIDNotInSlice(_id, records) {
					_ = utils.UpdateSerieIDs(FkSeries, "record", append(records, _id))
				}
			}
			// remove the deleted publisher
			if DeletedSeries != FkSeries {
				//get the list of series from publisher
				serie := authorityModels.Series{}
				filter := bson.M{}
				filter["_id"] = DeletedSeries
				c, _ := (&authorityModels.Series{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &serie); err != nil {
						fmt.Println(err)
					}

					records := utils.DeleteFromSliceOfIds(_id, serie.Record)
					_ = utils.UpdatePublisherIDs(DeletedSeries, "record", records)
				}
			}
		}
		//***
		if p.Args["FkSubSeries"] != nil {
			//update series
			var records []primitive.ObjectID
			//get the list of records from serie
			series := authorityModels.SubSeries{}
			filter := bson.M{}
			filter["_id"] = FkSubSeries
			c, _ := (&authorityModels.SubSeries{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &series); err != nil {
					fmt.Println(err)
				}
				//append the id

				records = series.Record
				if utils.ObjectIDNotInSlice(_id, records) {
					_ = utils.UpdateSubSerieIDs(FkSubSeries, "record", append(records, _id))
				}
			}
			// remove the deleted publisher
			if DeletedSubSeries != FkSubSeries {
				//get the list of series from publisher
				serie := authorityModels.SubSeries{}
				filter := bson.M{}
				filter["_id"] = DeletedSubSeries
				c, _ := (&authorityModels.SubSeries{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &serie); err != nil {
						fmt.Println(err)
					}

					records := utils.DeleteFromSliceOfIds(_id, serie.Record)
					_ = utils.UpdatePublisherIDs(DeletedSubSeries, "record", records)
				}
			}
		}
		//***
		if p.Args["CollectionTitle"] != nil {
			//update class number
			var records []primitive.ObjectID
			for i := 0; i < len(ObjectIDCollectionTitle); i++ {
				//get the list of serials in category
				uniformtitle := authorityModels.UniformTitle{}
				filter := bson.M{}
				filter["_id"] = ObjectIDCollectionTitle[i]
				c, _ := (&authorityModels.UniformTitle{}).FindMultiple(filter)
				if c != nil {
					jsonbody, err := json.Marshal(c)
					if err != nil {
						fmt.Println(err)
					}
					if err := json.Unmarshal(jsonbody, &uniformtitle); err != nil {
						fmt.Println(err)
					}
					records = uniformtitle.Record
					//append the id
					if utils.ObjectIDNotInSlice(_id, records) {
						utils.UpdateUniformTitleIDs(ObjectIDCollectionTitle[i], "record", append(records, _id))
					}
				}
			}
			// remove the deleted class numbers
			if len(deletedCollectionTitle) > 0 {
				for j := 0; j < len(deletedCollectionTitle); j++ {
					uniformtitle := authorityModels.UniformTitle{}
					filter := bson.M{}
					filter["_id"] = deletedCollectionTitle[j]
					c, _ := (&authorityModels.UniformTitle{}).FindMultiple(filter)
					if c != nil {
						jsonbody, err := json.Marshal(c)
						if err != nil {
							fmt.Println(err)
						}
						if err := json.Unmarshal(jsonbody, &uniformtitle); err != nil {
							fmt.Println(err)
						}

						records := utils.DeleteFromSliceOfIds(_id, uniformtitle.Record)
						_ = utils.UpdateUniformTitleIDs(deletedCollectionTitle[j], "record", records)
					}
				}
			}
		}
		return result.ModifiedCount, nil

	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneRecord = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("records")
		coll2 := models.DB.Collection("copies")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		//get the record
		record := utils.SearchRecord(_id)

		//remove the id of the record from from the branches
		for j := 0; j < len(record.Branches); j++ {
			branches := utils.SearchBranch(record.Branches[j])
			if branches != nil {
				s := utils.DeleteFromSliceOfIds(_id, branches.Records)
				_ = utils.UpdateBranchIDs(record.Branches[j], "records", s)
			}
		}

		//remove the id of the record from from the KeyWords
		for j := 0; j < len(record.KeyWords); j++ {
			KeyWords, _ := utils.SearchKeyWord(record.KeyWords[j])
			if KeyWords != nil {
				s := utils.DeleteFromSliceOfIds(_id, KeyWords.Records)
				_ = utils.UpdateKeyWordIDs(record.KeyWords[j], "records", s)
			}
		}
		//remove the id of the record from from the Languages
		for j := 0; j < len(record.Language); j++ {
			Languages, _ := utils.SearchLanguage(record.Language[j])
			if Languages != nil {
				s := utils.DeleteFromSliceOfIds(_id, Languages.Records)
				_ = utils.UpdateLanguageIDs(record.Language[j], "records", s)
			}
		}
		//remove the id of the record from from the OriginalLanguages
		for j := 0; j < len(record.OriginalLanguage); j++ {
			OriginalLanguages, _ := utils.SearchLanguage(record.OriginalLanguage[j])
			if OriginalLanguages != nil {
				s := utils.DeleteFromSliceOfIds(_id, OriginalLanguages.Records)
				_ = utils.UpdateBranchIDs(record.OriginalLanguage[j], "records", s)
			}
		}
		//remove the id of the record from from the copies
		for j := 0; j < len(record.Copies); j++ {
			Copy, _ := (&CatalogingModel.Copy{}).FindCopyByID(record.Copies[j])
			if Copy != nil {
				resultDelete, err := coll2.DeleteOne(ctx, bson.M{"_id": record.Copies[j]})
				if err != nil {
					fmt.Println(resultDelete)
				}
			}
		}
		//remove the id of the record from  the category
		for j := 0; j < len(record.Category); j++ {
			category := authorityModels.Category{}
			filter := bson.M{}
			filter["_id"] = record.Category[j]
			c, _ := (&authorityModels.Category{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &category); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, category.Record)
				_ = utils.UpdateCategoryIDs(record.Category[j], "record", s)
			}
		}
		//remove the id of the record from  the class number
		for j := 0; j < len(record.ClassNumber); j++ {
			classnumber := authorityModels.ClassNumber{}
			filter := bson.M{}
			filter["_id"] = record.ClassNumber[j]
			c, _ := (&authorityModels.Category{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &classnumber); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, classnumber.Record)
				_ = utils.UpdateClassNumberIDs(record.ClassNumber[j], "record", s)
			}
		}
		//remove the id of the record from  the publisher
		if record.Publishers != primitive.NilObjectID {
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = record.Publishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, publisher.Record)
				_ = utils.UpdatePublisherIDs(record.Publishers, "record", s)
			}
		}
		//remove the id of the serial from  the other publisher
		if record.OtherPublishers != primitive.NilObjectID {
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = record.Publishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, publisher.RecordOtherPublisher)
				_ = utils.UpdatePublisherIDs(record.OtherPublishers, "recordotherpublisher", s)
			}
		}
		//remove the id of the record from  serie
		if record.FkSeries != primitive.NilObjectID {
			serie := authorityModels.Series{}
			filter := bson.M{}
			filter["_id"] = record.FkSeries
			c, _ := (&authorityModels.Series{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &serie); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, serie.Record)
				_ = utils.UpdateSerieIDs(record.FkSeries, "record", s)
			}
		}
		//remove the id of the record from sub serie
		if record.FkSubSeries != primitive.NilObjectID {
			serie := authorityModels.SubSeries{}
			filter := bson.M{}
			filter["_id"] = record.FkSubSeries
			c, _ := (&authorityModels.SubSeries{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &serie); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, serie.Record)
				_ = utils.UpdateSubSerieIDs(record.FkSubSeries, "record", s)
			}
		}
		//remove the id of the record from  the uniform title
		for j := 0; j < len(record.CollectionTitle); j++ {
			uniformtitle := authorityModels.UniformTitle{}
			filter := bson.M{}
			filter["_id"] = record.CollectionTitle[j]
			c, _ := (&authorityModels.UniformTitle{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &uniformtitle); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, uniformtitle.Record)
				_ = utils.UpdateUniformTitleIDs(record.CollectionTitle[j], "record", s)
			}
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
