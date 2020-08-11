package CirculationMutation

import (
	"context"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/CirculationModel"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"os"
	"time"
)

var InsertOneCateg_Borrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"name_categorie": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"duree_adhesion": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"age_min": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"age_max": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		categorie := CirculationModel.CategoriesBrrowers{}

		if name := p.Args["name_categorie"]; name != nil {
			categorie.NameCategoriesBrrowers = name.(string)
		}
		if dureeAdhesion := p.Args["duree_adhesion"]; dureeAdhesion != nil {
			categorie.DureeAdhesion = dureeAdhesion.(int)
		}
		if ageMin := p.Args["age_min"]; ageMin != nil {
			categorie.AgeMin = ageMin.(int)
		}
		if ageMax := p.Args["age_max"]; ageMax != nil {
			categorie.AgeMax = ageMax.(int)
		}

		categorieExists := categorie.Find()
		if categorieExists != nil {
			return nil, errors.New("Categories already exists")
		}

		lastId, errInsert := categorie.Store()
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

var UpdateOneCateg_Brrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"name_categorie": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"duree_adhesion": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"age_min": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"age_max": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		categorieUpdate := bson.M{}
		categorie := CirculationModel.CategoriesBrrowers{}
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, errors.New("Error to convert id Categories Borrowers to HEX")
		}
		categorie.Id = _id
		if name := p.Args["name_categorie"]; name != nil {
			categorieUpdate["name_categories_brrowers"] = name.(string)
		}
		if dureeAdhesion := p.Args["duree_adhesion"]; dureeAdhesion != nil {
			categorieUpdate["duree_adhesion"] = dureeAdhesion.(int)
		}
		if ageMin := p.Args["age_min"]; ageMin != nil {
			categorieUpdate["age_min"] = ageMin.(int)
		}
		if ageMax := p.Args["age_max"]; ageMax != nil {
			categorieUpdate["age_max"] = ageMax.(int)
		}

		return categorie.Update(categorieUpdate)
	},
}

// Call
// 	{
// 	deleteOneBook(_id:"5e55229a25734e189a79aff5")
//   }
var DeleteOneCateg_Borrower = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection(os.Getenv(db.CategoriesBorrowers))

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
