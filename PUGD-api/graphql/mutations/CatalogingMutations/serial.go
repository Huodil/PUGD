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

var InsertOneSerial = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"ISSN": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"TitleProper": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherTitleInfo": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Summary": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"VisibleInSerial": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"ViewSerialCheckIn": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"NoteOnContents": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"GenetalNote": &graphql.ArgumentConfig{
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
		"Publishers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherPublishers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"ClassNumber": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"Responsibility": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ISSN := p.Args["ISSN"]
		TitleProper := p.Args["TitleProper"]
		OtherTitleInfo := p.Args["OtherTitleInfo"]
		ParallelTitle := p.Args["ParallelTitle"]
		RecYear := p.Args["RecYear"]
		Type := p.Args["Type"]
		Summary := p.Args["Summary"]
		VisibleInSerial := p.Args["VisibleInSerial"]
		ViewSerialCheckIn := p.Args["ViewSerialCheckIn"]
		NoteOnContents := p.Args["NoteOnContents"]
		GenetalNote := p.Args["GenetalNote"]
		Responsibilities := p.Args["Responsibility"]
		// ***
		var Publishers primitive.ObjectID
		if p.Args["Publishers"] != nil {

			Publishers1, err1 := primitive.ObjectIDFromHex(p.Args["Publishers"].(string))
			if err1 != nil {
				return nil, err1
			}
			Publishers = Publishers1
		}
		// ***
		var OtherPublishers primitive.ObjectID
		if p.Args["OtherPublishers"] != nil {

			OtherPublishers1, err1 := primitive.ObjectIDFromHex(p.Args["OtherPublishers"].(string))
			if err1 != nil {
				return nil, err1
			}
			OtherPublishers = OtherPublishers1
		}

		if ISSN == nil {
			ISSN = ""
		}
		if TitleProper == nil {
			TitleProper = ""
		}
		if OtherTitleInfo == nil {
			OtherTitleInfo = ""
		}
		if ParallelTitle == nil {
			ParallelTitle = ""
		}
		if RecYear == nil {
			RecYear = 0
		}
		if Type == nil {
			Type = ""
		}
		if VisibleInSerial == nil {
			VisibleInSerial = false
		}
		if Summary == nil {
			Summary = ""
		}
		if ViewSerialCheckIn == nil {
			ViewSerialCheckIn = false
		}
		if NoteOnContents == nil {
			NoteOnContents = ""
		}
		if GenetalNote == nil {
			GenetalNote = ""
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
		// prepare the Serial
		var serial = CatalogingModel.Serial{
			ISSN:              ISSN.(string),
			TitleProper:       TitleProper.(string),
			OtherTitleInfo:    OtherTitleInfo.(string),
			ParallelTitle:     ParallelTitle.(string),
			RecYear:           RecYear.(int),
			Summary:           Summary.(string),
			Type:              Type.(string),
			VisibleInSerial:   VisibleInSerial.(bool),
			ViewSerialCheckIn: ViewSerialCheckIn.(bool),
			NoteOnContents:    NoteOnContents.(string),
			GenetalNote:       GenetalNote.(string),
			Language:          ObjectIDLanguage,
			OriginalLanguage:  ObjectIDOriginalLanguage,
			KeyWords:          ObjectIDKeyWords,
			Category:          ObjectIDCategory,
			Branches:          ObjectIDBranches,
			Publishers:        Publishers,
			OtherPublishers:   OtherPublishers,
			Responsibility:    ListOfResponsibilities,
			ClassNumber:       ObjectIDClassNumber,
		}
		result := CatalogingModel.AddSerial(serial)

		//update Branches
		if p.Args["Branches"] != nil {
			var serials []primitive.ObjectID
			for i := 0; i < len(ObjectIDBranches); i++ {
				//get the list of serials in branch
				branches := utils.SearchBranch(ObjectIDBranches[i])
				if branches != nil {
					serials = branches.Serials
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateBranchIDs(ObjectIDBranches[i], "serials", append(serials, result))

					}
				}
			}
		}

		//update Languages
		if p.Args["Language"] != nil {
			var serials []primitive.ObjectID
			for i := 0; i < len(ObjectIDLanguage); i++ {
				//get the list of serials in languages
				Languages, _ := utils.SearchLanguage(ObjectIDLanguage[i])
				if Languages != nil {
					serials = Languages.Serials
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateLanguageIDs(ObjectIDLanguage[i], "serials", append(serials, result))
					}
				}
			}
		}
		//update OriginalLanguage
		if p.Args["OriginalLanguage"] != nil {
			var serials []primitive.ObjectID
			for i := 0; i < len(ObjectIDOriginalLanguage); i++ {
				//get the list of serials in Original Language
				OriginalLanguage, _ := utils.SearchLanguage(ObjectIDOriginalLanguage[i])

				if OriginalLanguage != nil {
					serials = OriginalLanguage.Serials
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateLanguageIDs(ObjectIDOriginalLanguage[i], "serials", append(serials, result))
					}
				}
			}
		}

		//update KeyWords
		if p.Args["KeyWords"] != nil {
			var serials []primitive.ObjectID
			for i := 0; i < len(ObjectIDKeyWords); i++ {
				//get the list of serials in keyword
				KeyWords, _ := utils.SearchKeyWord(ObjectIDKeyWords[i])
				if KeyWords != nil {
					serials = KeyWords.Serials
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateKeyWordIDs(ObjectIDKeyWords[i], "serials", append(serials, result))

					}
				}
			}
		}

		//update categories
		if p.Args["Category"] != nil {
			var serials []primitive.ObjectID
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
					serials = category.Serial
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateCategoryIDs(ObjectIDCategory[i], "serial", append(serials, result))
					}
				}
			}
		}

		//update class number
		if p.Args["ClassNumber"] != nil {
			var serials []primitive.ObjectID
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

					serials = classnumber.Serial
					//append the id
					if utils.ObjectIDNotInSlice(result, serials) {
						utils.UpdateClassNumberIDs(ObjectIDClassNumber[i], "serial", append(serials, result))
					}
				}
			}
		}
		//update publisher
		if p.Args["Publishers"] != nil {
			var serial []primitive.ObjectID

			//get the list of serials in category
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

				serial = publisher.Serial
				//append the id
				if utils.ObjectIDNotInSlice(result, serial) {
					utils.UpdatePublisherIDs(Publishers, "serial", append(serial, result))
				}
			}
		}
		//update other publisher
		if p.Args["OtherPublishers"] != nil {
			var serial []primitive.ObjectID

			//get the list of serials in category
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

				serial = Otherpublisher.SerialOtherPublisher
				//append the id
				if utils.ObjectIDNotInSlice(result, serial) {
					utils.UpdatePublisherIDs(Publishers, "serialotherpublisher", append(serial, result))
				}
			}
		}

		return result, nil
	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}

var UpdateOneSerial = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"ISSN": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"TitleProper": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherTitleInfo": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ParallelTitle": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"RecYear": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Summary": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"VisibleInSerial": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"ViewSerialCheckIn": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"NoteOnContents": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"GenetalNote": &graphql.ArgumentConfig{
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
		"Publishers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OtherPublishers": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Responsibility": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
		"ClassNumber": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("serials")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		// set the variables
		ISSN := p.Args["ISSN"]
		TitleProper := p.Args["TitleProper"]
		OtherTitleInfo := p.Args["OtherTitleInfo"]
		ParallelTitle := p.Args["ParallelTitle"]
		RecYear := p.Args["RecYear"]
		Type := p.Args["Type"]
		Summary := p.Args["Summary"]
		VisibleInSerial := p.Args["VisibleInSerial"]
		ViewSerialCheckIn := p.Args["ViewSerialCheckIn"]
		NoteOnContents := p.Args["NoteOnContents"]
		GenetalNote := p.Args["GenetalNote"]
		Responsibilities := p.Args["Responsibility"]
		serialUpdate := bson.M{}

		if ISSN != nil {
			serialUpdate["issn"] = ISSN
		}
		if TitleProper != nil {
			serialUpdate["titleproper"] = TitleProper
		}
		if OtherTitleInfo != nil {
			serialUpdate["othertitleinfo"] = OtherTitleInfo
		}
		if ParallelTitle != nil {
			serialUpdate["paralleltitle"] = ParallelTitle
		}
		if RecYear != nil {
			serialUpdate["recyear"] = RecYear
		}
		if Type != nil {
			serialUpdate["type"] = Type
		}
		if Summary != nil {
			serialUpdate["summary"] = Summary
		}
		if VisibleInSerial != nil {
			serialUpdate["visibleinserial"] = VisibleInSerial
		}
		if ViewSerialCheckIn != nil {
			serialUpdate["viewserialcheckin"] = ViewSerialCheckIn
		}
		if NoteOnContents != nil {
			serialUpdate["noteoncontents"] = NoteOnContents
		}
		if GenetalNote != nil {
			serialUpdate["genetalnote"] = GenetalNote
		}
		serial := utils.SearchSerial(_id)

		// update the publisher and store the deleted one
		var deletedPublisher primitive.ObjectID
		var Publisher primitive.ObjectID
		if p.Args["Publishers"] != nil {

			Publisher, err1 := primitive.ObjectIDFromHex(p.Args["Publishers"].(string))
			if err1 != nil {
				return nil, err1
			}
			serialUpdate["publishers"] = Publisher
			// store the deleted publisher
			if Publisher != serial.OtherPublishers {
				deletedPublisher = serial.OtherPublishers
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
			serialUpdate["otherpublishers"] = OtherPublisher
			// store the deleted other publisher
			if OtherPublisher != serial.OtherPublishers {
				deletedOtherPublisher = serial.OtherPublishers
			}
		}
		// update the languages and store the deleted ones
		var ObjectIDLanguage []primitive.ObjectID
		var deletedLanguages []primitive.ObjectID
		if p.Args["Language"] != nil {
			// make an objectID list out of the an argument
			ObjectIDLanguage = utils.MakeSliceOfIDs(p.Args["Language"].([]interface{}))
			serialUpdate["language"] = ObjectIDLanguage
			// make an objectId list of the deleted Languages
			deletedLanguages = utils.DeletedIDs(serial.Language, ObjectIDLanguage)
		}

		// update the original languages and store the deleted ones
		var ObjectIDOriginalLanguage []primitive.ObjectID
		var deletedOriginalLanguages []primitive.ObjectID
		if p.Args["OriginalLanguage"] != nil {
			// make an objectID list out of the an argument
			ObjectIDOriginalLanguage = utils.MakeSliceOfIDs(p.Args["OriginalLanguage"].([]interface{}))
			serialUpdate["originallanguage"] = ObjectIDOriginalLanguage
			// make an objectId list of the deleted OriginalLanguages
			deletedOriginalLanguages = utils.DeletedIDs(serial.OriginalLanguage, ObjectIDOriginalLanguage)
		}
		//update the keywords and store the deleted ones
		var ObjectIDKeyWord []primitive.ObjectID
		var deletedKeyWords []primitive.ObjectID
		if p.Args["KeyWords"] != nil {
			// make an objectID list out of the an argument
			ObjectIDKeyWord = utils.MakeSliceOfIDs(p.Args["KeyWords"].([]interface{}))
			serialUpdate["keywords"] = ObjectIDKeyWord
			// make an objectId list of the deleted KeyWords
			deletedKeyWords = utils.DeletedIDs(serial.KeyWords, ObjectIDKeyWord)
		}
		//update the class numbers and store the deleted ones
		var ObjectIDClassNumber []primitive.ObjectID
		var DeletedClassNumbers []primitive.ObjectID
		if p.Args["ClassNumber"] != nil {
			// make an objectID list out of the an argument
			ObjectIDClassNumber = utils.MakeSliceOfIDs(p.Args["ClassNumber"].([]interface{}))
			serialUpdate["classnumber"] = ObjectIDClassNumber
			// make an objectId list of the deleted classnumbers
			deletedKeyWords = utils.DeletedIDs(serial.ClassNumber, ObjectIDClassNumber)
		}

		// update the categoties and store the deleted ones
		var ObjectIDCategory []primitive.ObjectID
		var DeletedCategories []primitive.ObjectID
		if p.Args["Category"] != nil {
			// make an objectID list out of the an argument
			ObjectIDCategory = utils.MakeSliceOfIDs(p.Args["Category"].([]interface{}))
			serialUpdate["category"] = ObjectIDCategory
			// make an objectId list of the deleted classnumbers
			DeletedCategories = utils.DeletedIDs(serial.Category, ObjectIDCategory)
		}

		//update the branches and store the deleted ones
		var ObjectIDBranches []primitive.ObjectID
		var deletedBranches []primitive.ObjectID
		if p.Args["Branches"] != nil {
			// make an objectID list out of the an argument
			ObjectIDBranches = utils.MakeSliceOfIDs(p.Args["Branches"].([]interface{}))
			serialUpdate["branches"] = ObjectIDBranches
			// make an objectId list of the deleted branches
			deletedBranches = utils.DeletedIDs(serial.Branches, ObjectIDBranches)
		}
		//update the responsabilities
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
			serialUpdate["responsibility"] = ListOfResponsibilities
		}

		// do the update
		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": serialUpdate,
			})

		if err2 != nil {
			log.Fatal(err2)
		}
		// ***
		if p.Args["Branches"] != nil {
			//update Branches
			for i := 0; i < len(ObjectIDBranches); i++ {
				//get the list of serials in branch
				branches := utils.SearchBranch(ObjectIDBranches[i])
				if branches != nil {
					serials := branches.Serials
					//append the id
					if utils.ObjectIDNotInSlice(_id, serials) {
						_ = utils.UpdateBranchIDs(ObjectIDBranches[i], "serials", append(serials, _id))
					}
				}
			}
			// remove the deleted branches
			if len(deletedBranches) > 0 {
				for j := 0; j < len(deletedBranches); j++ {
					branches := utils.SearchBranch(deletedBranches[j])
					if branches != nil {
						serials := utils.DeleteFromSliceOfIds(_id, branches.Serials)
						_ = utils.UpdateBranchIDs(deletedBranches[j], "serials", serials)
					}
				}
			}
		}
		//***
		if p.Args["Language"] != nil {
			//update Languages
			for i := 0; i < len(ObjectIDLanguage); i++ {
				//get the list of records in Language
				Languages, _ := utils.SearchLanguage(ObjectIDLanguage[i])
				if Languages != nil {
					serial := Languages.Serials
					//append the id
					if utils.ObjectIDNotInSlice(_id, serial) {
						_ = utils.UpdateLanguageIDs(ObjectIDLanguage[i], "serials", append(serial, _id))

					}
				}
			}
			// remove the deleted Languages
			if len(deletedLanguages) > 0 {
				for j := 0; j < len(deletedLanguages); j++ {
					Languages, _ := utils.SearchLanguage(deletedLanguages[j])
					if Languages != nil {
						serials := utils.DeleteFromSliceOfIds(_id, Languages.Serials)
						_ = utils.UpdateLanguageIDs(deletedLanguages[j], "serials", serials)
					}
				}
			}
		}
		//***
		if p.Args["OriginalLanguage"] != nil {
			//update OriginalLanguages
			for i := 0; i < len(ObjectIDOriginalLanguage); i++ {
				//get the list of records in branch
				OriginalLanguage, _ := utils.SearchLanguage(ObjectIDOriginalLanguage[i])
				if OriginalLanguage != nil {
					serials := OriginalLanguage.Serials
					//append the id
					if utils.ObjectIDNotInSlice(_id, serials) {
						_ = utils.UpdateLanguageIDs(ObjectIDOriginalLanguage[i], "serials", append(serials, _id))

					}
				}
			}
			// remove the deleted OriginalLanguages
			if len(deletedOriginalLanguages) > 0 {
				for j := 0; j < len(deletedOriginalLanguages); j++ {
					OriginalLanguages, _ := utils.SearchLanguage(deletedOriginalLanguages[j])
					if OriginalLanguages != nil {
						serials := utils.DeleteFromSliceOfIds(_id, OriginalLanguages.Serials)
						_ = utils.UpdateLanguageIDs(deletedOriginalLanguages[j], "serials", serials)
					}
				}
			}
		}
		//***
		if p.Args["KeyWords"] != nil {
			//update keyword
			for i := 0; i < len(ObjectIDKeyWord); i++ {
				//get the list of records in KeyWord
				KeyWords, _ := utils.SearchKeyWord(ObjectIDKeyWord[i])
				if KeyWords != nil {
					serials := KeyWords.Serials
					//append the id
					if utils.ObjectIDNotInSlice(_id, serials) {
						_ = utils.UpdateKeyWordIDs(ObjectIDKeyWord[i], "serials", append(serials, _id))

					}
				}
			}
			// remove the deleted KeyWords
			if len(deletedKeyWords) > 0 {
				for j := 0; j < len(deletedKeyWords); j++ {
					KeyWords, _ := utils.SearchKeyWord(deletedKeyWords[j])
					if KeyWords != nil {
						serials := utils.DeleteFromSliceOfIds(_id, KeyWords.Serials)
						_ = utils.UpdateKeyWordIDs(deletedKeyWords[j], "serials", serials)
					}
				}
			}
		}
		//***
		if p.Args["Category"] != nil {
			//update category
			var serials []primitive.ObjectID
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
					serials = category.Serial
					//append the id
					if utils.ObjectIDNotInSlice(_id, serials) {
						utils.UpdateCategoryIDs(ObjectIDCategory[i], "serial", append(serials, _id))
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

						serials := utils.DeleteFromSliceOfIds(_id, category.Serial)
						_ = utils.UpdateCategoryIDs(DeletedCategories[j], "serial", serials)
					}
				}
			}
		}
		//***
		if p.Args["ClassNumber"] != nil {
			//update class number
			var serials []primitive.ObjectID
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

					serials = classnumber.Serial
					//append the id
					if utils.ObjectIDNotInSlice(_id, serials) {
						utils.UpdateClassNumberIDs(ObjectIDClassNumber[i], "serial", append(serials, _id))
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

						serials := utils.DeleteFromSliceOfIds(_id, classnumber.Serial)
						_ = utils.UpdateClassNumberIDs(DeletedClassNumbers[j], "serial", serials)
					}
				}
			}
		}
		//***
		if p.Args["Publishers"] != nil {
			//update publisher
			var serial []primitive.ObjectID
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

				serial = publisher.Serial
				if utils.ObjectIDNotInSlice(_id, serial) {
					_ = utils.UpdatePublisherIDs(Publisher, "serial", append(serial, _id))
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

					serial := utils.DeleteFromSliceOfIds(_id, publisher.Serial)
					_ = utils.UpdatePublisherIDs(deletedPublisher, "serial", serial)
				}
			}
		}
		//***
		if p.Args["OtherPublishers"] != nil {
			//update other publisher
			var serial []primitive.ObjectID
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

				serial = publisher.SerialOtherPublisher
				if utils.ObjectIDNotInSlice(_id, serial) {
					_ = utils.UpdatePublisherIDs(Publisher, "serialotherpublisher", append(serial, _id))
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
					serial := utils.DeleteFromSliceOfIds(_id, publisher.SerialOtherPublisher)
					_ = utils.UpdatePublisherIDs(deletedOtherPublisher, "serialotherpublisher", serial)
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
var DeleteOneSerial = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("serials")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		//get the serial
		serial := utils.SearchSerial(_id)

		//remove the id of the serial from  the branches
		for j := 0; j < len(serial.Branches); j++ {
			branches := utils.SearchBranch(serial.Branches[j])
			if branches != nil {
				s := utils.DeleteFromSliceOfIds(_id, branches.Serials)
				_ = utils.UpdateBranchIDs(serial.Branches[j], "serials", s)
			}
		}

		//remove the id of the serial from  the KeyWords
		for j := 0; j < len(serial.KeyWords); j++ {
			KeyWords, _ := utils.SearchKeyWord(serial.KeyWords[j])
			if KeyWords != nil {
				s := utils.DeleteFromSliceOfIds(_id, KeyWords.Serials)
				_ = utils.UpdateKeyWordIDs(serial.KeyWords[j], "serials", s)
			}
		}
		//remove the id of the serial from  the Languages
		for j := 0; j < len(serial.Language); j++ {
			Languages, _ := utils.SearchLanguage(serial.Language[j])
			if Languages != nil {
				s := utils.DeleteFromSliceOfIds(_id, Languages.Serials)
				_ = utils.UpdateLanguageIDs(serial.Language[j], "serials", s)
			}
		}
		//remove the id of the serial from  the OriginalLanguages
		for j := 0; j < len(serial.OriginalLanguage); j++ {
			OriginalLanguages, _ := utils.SearchLanguage(serial.OriginalLanguage[j])
			if OriginalLanguages != nil {
				s := utils.DeleteFromSliceOfIds(_id, OriginalLanguages.Serials)
				_ = utils.UpdateBranchIDs(serial.OriginalLanguage[j], "serials", s)
			}
		}
		//remove the id of the serial from  the category
		for j := 0; j < len(serial.Category); j++ {
			category := authorityModels.Category{}
			filter := bson.M{}
			filter["_id"] = serial.Category[j]
			c, _ := (&authorityModels.Category{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &category); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, category.Serial)
				_ = utils.UpdateCategoryIDs(serial.Category[j], "serial", s)
			}
		}
		//remove the id of the serial from  the class number
		for j := 0; j < len(serial.ClassNumber); j++ {
			classnumber := authorityModels.ClassNumber{}
			filter := bson.M{}
			filter["_id"] = serial.ClassNumber[j]
			c, _ := (&authorityModels.Category{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &classnumber); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, classnumber.Serial)
				_ = utils.UpdateClassNumberIDs(serial.ClassNumber[j], "serial", s)
			}
		}
		//remove the id of the serial from  the publisher
		if serial.Publishers != primitive.NilObjectID {
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = serial.Publishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, publisher.Serial)
				_ = utils.UpdatePublisherIDs(serial.Publishers, "serial", s)
			}
		}
		//remove the id of the serial from  the other publisher
		if serial.OtherPublishers != primitive.NilObjectID {
			publisher := authorityModels.Publisher{}
			filter := bson.M{}
			filter["_id"] = serial.Publishers
			c, _ := (&authorityModels.Publisher{}).FindMultiple(filter)
			if c != nil {
				jsonbody, err := json.Marshal(c)
				if err != nil {
					fmt.Println(err)
				}
				if err := json.Unmarshal(jsonbody, &publisher); err != nil {
					fmt.Println(err)
				}
				s := utils.DeleteFromSliceOfIds(_id, publisher.SerialOtherPublisher)
				_ = utils.UpdatePublisherIDs(serial.OtherPublishers, "serialotherpublisher", s)
			}
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}
		return resultDelete.DeletedCount, nil
	},
}
