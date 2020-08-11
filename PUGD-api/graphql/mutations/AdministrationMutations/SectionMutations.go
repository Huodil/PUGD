package AdministrationMutations

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
)

var InsertOneSection = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"section_name": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"image": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"visible_in_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"visible_in_location": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"OwenId": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		Section := AdministrationModels.Section{}

		if name := p.Args["section_name"]; name != nil {
			Section.Name = name.(string)
		}
		if image := p.Args["image"]; image != nil {
			Section.Image = image.(string)
		}
		if visibleinopac := p.Args["visible_in_opac"]; visibleinopac != nil {
			Section.VisibleInOPAC = visibleinopac.(bool)
		}
		if visibleinlocation := p.Args["visible_in_location"]; visibleinlocation != nil {
			Section.VisibleInLocation = visibleinlocation.(bool)
		}
		if internationalcode := p.Args["international_code"]; internationalcode != nil {
			Section.InternationalCode = internationalcode.(string)
		}

		if p.Args["OwenId"] != nil {
			OwenId, err := primitive.ObjectIDFromHex(p.Args["OwenId"].(string))
			if err != nil {
				return nil, errors.New(err.Error())
			}
			Section.OwenId = OwenId
		}
		sectionExists := Section.Find()
		if sectionExists != nil {
			return nil, errors.New("Section already exists")
		}
		lastId, errInsert := Section.Store()
		if errInsert != nil {
			return nil, errInsert
		}
		return lastId.Hex(), nil
	},
}

// usage
// {
// 	updateOneBook(
// 	  _id:"5e55229a25734e189a79aff5"
// 	  id:"zzuuuzzz",
// 	  isbn:"uuuu" )
// 	}
var UpdateOneSection = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"section_name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"image": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"visible_in_opac": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"visible_in_location": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
		"international_code": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"owen": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		Section := AdministrationModels.Section{}
		SectionUpdate := bson.M{}
		if name := p.Args["section_name"]; name != nil {
			SectionUpdate["section_name"] = name.(string)
		}
		if image := p.Args["image"]; image != nil {
			SectionUpdate["image"] = image.(string)
		}
		if visibleinopac := p.Args["visible_in_opac"]; visibleinopac != nil {
			SectionUpdate["visible_in_opac"] = visibleinopac.(bool)
		}
		if visibleinlocation := p.Args["visible_in_location"]; visibleinlocation != nil {
			SectionUpdate["visible_in_location"] = visibleinlocation.(bool)
		}
		if internationalcode := p.Args["international_code"]; internationalcode != nil {
			SectionUpdate["international_code"] = internationalcode.(string)
		}

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id Section to HEX")
		}
		Section.ID = _id

		return Section.Update(SectionUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneSetion = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.Section))

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			fmt.Println(resultDelete)
		}

		return resultDelete.DeletedCount, nil
	},
}
