package CatalogingMutations

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertOneBranch = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"BranchName": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchZip": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"BranchCity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchState": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchCountry": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchFax": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchPhone": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchUrl": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchIp": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"GeoLocation": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Library": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("branches")

		BranchName := p.Args["BranchName"]
		BranchZip := p.Args["BranchZip"]
		BranchCity := p.Args["BranchCity"]
		BranchState := p.Args["BranchState"]
		BranchCountry := p.Args["BranchCountry"]
		BranchFax := p.Args["BranchFax"]
		BranchPhone := p.Args["BranchPhone"]
		BranchUrl := p.Args["BranchUrl"]
		BranchIp := p.Args["BranchIp"]
		GeoLocation := p.Args["GeoLocation"]

		var Library primitive.ObjectID

		if p.Args["Library"] != nil {

			Library1, err2 := primitive.ObjectIDFromHex(p.Args["Library"].(string))
			if err2 != nil {
				return nil, err2
			}
			Library = Library1
		}

		if BranchName == nil {
			BranchName = ""
		}
		if BranchZip == nil {
			BranchZip = 0
		}
		if BranchCity == nil {
			BranchCity = ""
		}
		if BranchState == nil {
			BranchState = ""
		}
		if BranchCountry == nil {
			BranchCountry = ""
		}
		if BranchFax == nil {
			BranchFax = ""
		}
		if BranchPhone == nil {
			BranchPhone = ""
		}
		if BranchUrl == nil {
			BranchUrl = ""
		}
		if BranchIp == nil {
			BranchIp = ""
		}
		if GeoLocation == nil {
			GeoLocation = ""
		}

		var b = CatalogingModel.Branch{
			BranchName:    BranchName.(string),
			BranchZip:     BranchZip.(int),
			BranchCity:    BranchCity.(string),
			BranchState:   BranchState.(string),
			BranchCountry: BranchCountry.(string),
			BranchFax:     BranchFax.(string),
			BranchPhone:   BranchPhone.(string),
			BranchUrl:     BranchUrl.(string),
			BranchIp:      BranchIp.(string),
			GeoLocation:   GeoLocation.(string),
			Library:       Library,
		}
		result, err2 := coll.InsertOne(ctx, b)
		if err2 != nil {
			log.Fatal(err2)
		}
		fmt.Println(result.InsertedID.(primitive.ObjectID))
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

var UpdateOneBranch = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"BranchName": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchZip": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"BranchCity": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchState": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchCountry": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchFax": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchPhone": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchUrl": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BranchIp": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"GeoLocation": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Library": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("branches")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		BranchName := p.Args["BranchName"]
		BranchZip := p.Args["BranchZip"]
		BranchCity := p.Args["BranchCity"]
		BranchState := p.Args["BranchState"]
		BranchCountry := p.Args["BranchCountry"]
		BranchFax := p.Args["BranchFax"]
		BranchPhone := p.Args["BranchPhone"]
		BranchUrl := p.Args["BranchUrl"]
		BranchIp := p.Args["BranchIp"]
		GeoLocation := p.Args["GeoLocation"]

		branchUpdate := bson.M{}

		if BranchName != nil {
			branchUpdate["branchname"] = BranchName
		}
		if BranchZip != nil {
			branchUpdate["branchzip"] = BranchZip
		}
		if BranchCity != nil {
			branchUpdate["branchcity"] = BranchCity
		}
		if BranchState != nil {
			branchUpdate["branchstate"] = BranchState
		}
		if BranchCountry != nil {
			branchUpdate["branchcountry"] = BranchCountry
		}
		if BranchFax != nil {
			branchUpdate["branchfax"] = BranchFax
		}
		if BranchPhone != nil {
			branchUpdate["branchphone"] = BranchPhone
		}
		if BranchUrl != nil {
			branchUpdate["branchurl"] = BranchUrl
		}
		if BranchIp != nil {
			branchUpdate["branchip"] = BranchIp
		}
		if GeoLocation != nil {
			branchUpdate["geolocation"] = GeoLocation
		}

		if p.Args["Library"] != nil {

			Library, err2 := primitive.ObjectIDFromHex(p.Args["Library"].(string))
			if err2 != nil {
				return nil, err2
			}
			branchUpdate["library"] = Library
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": branchUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneBranch = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("branches")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		branch := utils.SearchBranch(_id)
		//remove the id of the branch from from the serials
		for i := 0; i < len(branch.Serials); i++ {
			serial, _ := CatalogingModel.FindSerialByID(branch.Serials[i])
			if serial != nil {
				s := utils.DeleteFromSliceOfIds(_id, serial.Branches)
				_ = utils.UpdateSerialIDs(branch.Serials[i], "branches", s)
			}

		}
		//remove the id of the branch from from the records
		for i := 0; i < len(branch.Records); i++ {
			record, _ := CatalogingModel.FindRecordByID(branch.Records[i])
			if record != nil {
				r := utils.DeleteFromSliceOfIds(_id, record.Branches)
				_ = utils.UpdateRecordIDs(branch.Records[i], "branches", r)
			}

		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil

	},
}
