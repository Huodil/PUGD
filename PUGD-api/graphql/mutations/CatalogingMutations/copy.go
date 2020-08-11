package CatalogingMutations

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneCopy = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"BareCode": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"ReplacementPrice": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"DateLastBorrowed": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"DateLastSeen": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Stack": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteForLoan": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"WithDrawn": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"Reserves": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Restricted": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CopyNumber": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"NewStatus": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"MediaType": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CodeStatic": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Owner": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Section": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Record": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Cote": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Localisation": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection(os.Getenv(db.Copies))

		BareCode := p.Args["BareCode"]
		Price := p.Args["Price"]
		ReplacementPrice := p.Args["ReplacementPrice"]
		DateLastBorrowed := p.Args["DateLastBorrowed"]
		DateLastSeen := p.Args["DateLastSeen"]
		Stack := p.Args["Stack"]
		NoteForLoan := p.Args["NoteForLoan"]
		WithDrawn := p.Args["WithDrawn"]
		Reserves := p.Args["Reserves"]
		Restricted := p.Args["Restricted"]
		CopyNumber := p.Args["CopyNumber"]
		NewStatus := p.Args["NewStatus"]
		Cote := p.Args["Cote"]
		var Status primitive.ObjectID
		if p.Args["Status"] != nil {

			Status1, err2 := primitive.ObjectIDFromHex(p.Args["Status"].(string))
			if err2 != nil {
				return nil, err2
			}
			Status = Status1
		}

		var CodeStatic primitive.ObjectID
		if p.Args["CodeStatic"] != nil {

			CodeStatic1, err2 := primitive.ObjectIDFromHex(p.Args["CodeStatic"].(string))
			if err2 != nil {
				return nil, err2
			}
			CodeStatic = CodeStatic1
		}

		var MediaType primitive.ObjectID
		if p.Args["MediaType"] != nil {

			MediaType1, err2 := primitive.ObjectIDFromHex(p.Args["MediaType"].(string))
			if err2 != nil {
				return nil, err2
			}
			MediaType = MediaType1
		}

		var Owner primitive.ObjectID
		if p.Args["Owner"] != nil {

			Owner1, err2 := primitive.ObjectIDFromHex(p.Args["Owner"].(string))
			if err2 != nil {
				return nil, err2
			}
			Owner = Owner1
		}

		var Section primitive.ObjectID
		if p.Args["Section"] != nil {

			Section1, err2 := primitive.ObjectIDFromHex(p.Args["Section"].(string))
			if err2 != nil {
				return nil, err2
			}
			Section = Section1
		}

		var Record primitive.ObjectID
		if p.Args["Record"] != nil {

			Record1, err2 := primitive.ObjectIDFromHex(p.Args["Record"].(string))
			if err2 != nil {
				return nil, err2
			}
			Record = Record1
		}

		var Localisation primitive.ObjectID
		if p.Args["Localisation"] != nil {

			Localisation1, err2 := primitive.ObjectIDFromHex(p.Args["Localisation"].(string))
			if err2 != nil {
				return nil, err2
			}
			Localisation = Localisation1
		}

		if BareCode == nil {
			BareCode = ""
		}
		if Price == nil {
			Price = 0.0
		}
		if Cote == nil {
			Cote = ""
		}
		if ReplacementPrice == nil {
			ReplacementPrice = 0.0
		}
		if DateLastBorrowed == nil {
			DateLastBorrowed = ""
		}
		if DateLastSeen == nil {
			DateLastSeen = ""
		}
		if Stack == nil {
			Stack = ""
		}
		if NoteForLoan == nil {
			NoteForLoan = false
		}
		if WithDrawn == nil {
			WithDrawn = false
		}
		if Reserves == nil {
			Reserves = 0
		}
		if Restricted == nil {
			Restricted = ""
		}
		if CopyNumber == nil {
			CopyNumber = 0
		}
		if NewStatus == nil {
			NewStatus = ""
		}

		var c = CatalogingModel.Copy{
			BareCode:         BareCode.(string),
			Price:            Price.(float64),
			ReplacementPrice: ReplacementPrice.(float64),
			DateLastBorrowed: DateLastBorrowed.(string),
			DateLastSeen:     DateLastSeen.(string),
			Stack:            Stack.(string),
			NoteForLoan:      NoteForLoan.(bool),
			WithDrawn:        WithDrawn.(bool),
			Reserves:         Reserves.(int),
			Restricted:       Restricted.(string),
			CopyNumber:       CopyNumber.(int),
			NewStatus:        NewStatus.(string),
			Record:           Record,
			Status:           Status,
			Owner:            Owner,
			MediaType:        MediaType,
			Section:          Section,
			Localisation:     Localisation,
			Cote:             Cote.(string),
			CodeStatic:       CodeStatic,
		}

		result, err2 := coll.InsertOne(ctx, c)
		if err2 != nil {
			log.Fatal(err2)
		}

		//update Branches
		if p.Args["Record"] != nil {
			var copy []primitive.ObjectID

			//get the list of serials in branch
			records, _ := CatalogingModel.FindRecordByID(Record)
			if records != nil {
				copy = records.Copies
				//append the id
				if utils.ObjectIDNotInSlice(result.InsertedID.(primitive.ObjectID), copy) {
					utils.UpdateRecordIDs(Record, "copies", append(copy, result.InsertedID.(primitive.ObjectID)))
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

var UpdateOneCopy = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Status": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BareCode": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"ReplacementPrice": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"DateLastBorrowed": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"DateLastSeen": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CodeStatic": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Stack": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"NoteForLoan": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"WithDrawn": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"Reserves": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Restricted": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"CopyNumber": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"NewStatus": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"MediaType": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Owner": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Section": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Record": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Cote": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Localisation": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("copies")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		BareCode := p.Args["BareCode"]
		Price := p.Args["Price"]
		ReplacementPrice := p.Args["ReplacementPrice"]
		DateLastBorrowed := p.Args["DateLastBorrowed"]
		DateLastSeen := p.Args["DateLastSeen"]
		Stack := p.Args["Stack"]
		NoteForLoan := p.Args["NoteForLoan"]
		WithDrawn := p.Args["WithDrawn"]
		Reserves := p.Args["Reserves"]
		Restricted := p.Args["Restricted"]
		CopyNumber := p.Args["CopyNumber"]
		NewStatus := p.Args["NewStatus"]
		Cote := p.Args["Cote"]
		copyUpdate := bson.M{}

		if BareCode != nil {
			copyUpdate["barecode"] = BareCode
		}
		if Price != nil {
			copyUpdate["price"] = Price
		}
		if ReplacementPrice != nil {
			copyUpdate["replacementprice"] = ReplacementPrice
		}
		if DateLastBorrowed != nil {
			copyUpdate["datelastborrowed"] = DateLastBorrowed
		}
		if DateLastSeen != nil {
			copyUpdate["datelastseen"] = DateLastSeen
		}
		if Stack != nil {
			copyUpdate["stack"] = Stack
		}
		if NoteForLoan != nil {
			copyUpdate["noteforloan"] = NoteForLoan
		}
		if WithDrawn != nil {
			copyUpdate["withdrawn"] = WithDrawn
		}
		if Reserves != nil {
			copyUpdate["reserves"] = Reserves
		}
		if Restricted != nil {
			copyUpdate["restricted"] = Restricted
		}
		if CopyNumber != nil {
			copyUpdate["copynumber"] = CopyNumber
		}
		if NewStatus != nil {
			copyUpdate["newstatus"] = NewStatus
		}
		if Cote != nil {
			copyUpdate["cote"] = Cote
		}

		if p.Args["Status"] != nil {

			Status, err2 := primitive.ObjectIDFromHex(p.Args["Status"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["status"] = Status
		}

		if p.Args["CodeStatic"] != nil {

			CodeStatic, err2 := primitive.ObjectIDFromHex(p.Args["CodeStatic"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["codestatic"] = CodeStatic
		}

		if p.Args["MediaType"] != nil {

			MediaType, err2 := primitive.ObjectIDFromHex(p.Args["MediaType"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["mediatype"] = MediaType
		}

		if p.Args["Owner"] != nil {

			Owner, err2 := primitive.ObjectIDFromHex(p.Args["Owner"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["owner"] = Owner
		}

		if p.Args["Section"] != nil {

			Section, err2 := primitive.ObjectIDFromHex(p.Args["Section"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["section"] = Section
		}
		copy, _ := (&CatalogingModel.Copy{}).FindCopyByID(_id)
		var deletedRecord primitive.ObjectID
		var RecordObjectId primitive.ObjectID
		if p.Args["Record"] != nil {

			Record, err2 := primitive.ObjectIDFromHex(p.Args["Record"].(string))
			if err2 != nil {
				return nil, err2
			}
			RecordObjectId = Record
			copyUpdate["record"] = Record
			// make an objectId list of the deleted KeyWords
			deletedRecord = copy.Record
		}

		if p.Args["Localisation"] != nil {

			Localisation, err2 := primitive.ObjectIDFromHex(p.Args["Localisation"].(string))
			if err2 != nil {
				return nil, err2
			}
			copyUpdate["localisation"] = Localisation
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": copyUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}

		if p.Args["Record"] != nil {
			//update Branches

			//get the list of copies in record
			Record, _ := CatalogingModel.FindRecordByID(RecordObjectId)
			if Record != nil {
				Copies := Record.Copies
				//append the id
				if utils.ObjectIDNotInSlice(_id, Copies) {
					_ = utils.UpdateRecordIDs(RecordObjectId, "copies", append(Copies, _id))
				}
			}
			// remove the deleted records
			if deletedRecord != RecordObjectId {

				Record, _ := CatalogingModel.FindRecordByID(deletedRecord)
				if Record != nil {
					copies := utils.DeleteFromSliceOfIds(_id, Record.Copies)
					_ = utils.UpdateBranchIDs(deletedRecord, "copies", copies)
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
var DeleteOneCopy = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("copies")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		copy, _ := (&CatalogingModel.Copy{}).FindCopyByID(_id)

		//remove the id of the serial from from the branches

		record := utils.SearchRecord(copy.Record)
		if record != nil {
			s := utils.DeleteFromSliceOfIds(_id, record.Copies)
			_ = utils.UpdateRecordIDs(record.Id, "copies", s)
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
