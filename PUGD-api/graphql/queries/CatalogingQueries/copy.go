package CatalogingQueries

import (
	"context"
	"fmt"
	"github.com/graphql-go/graphql/language/ast"
	"github.com/graphql-go/graphql/language/kinds"
	"log"

	"time"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/CatalogingTypes"
	"github.com/Harmony-Technology/PUGD-api/models"

	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// done Examplaire !
var GetOneCopy = &graphql.Field{
	Type: CatalogingTypes.CopyType,
	Args: graphql.FieldConfigArgument{
		"id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		c := &CatalogingModel.Copy{}

		filter := bson.M{}
		_id, err := primitive.ObjectIDFromHex(p.Args["id"].(string))
		if err != nil {
			return nil, err
		}
		filter["_id"] = _id

		// todo change copies to Examplaire in --> .env file and constant_DB.go file
		err = models.DB.Collection("copies").FindOne(ctx, filter).Decode(c)
		if err != nil {
			log.Print("error 2", err)
			if err == mongo.ErrNoDocuments {
				log.Print(err)
				return nil, err
			}

		}
		return c, nil
	},
}

// done add search by code_bar : is using in module Circulation -> examplaire -> search Examplaire : in frontEnd
// check if is disponible of reserved or have reservation to valide it
var GetCopyByCodeBar = &graphql.Field{
	Type: CatalogingTypes.CopyType,
	Args: graphql.FieldConfigArgument{
		"code_bar": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		// filter by code_bar
		filter := bson.M{}
		if barcode := p.Args["code_bar"]; barcode != nil {
			filter["barecode"] = primitive.Regex{Pattern: barcode.(string), Options: ""}
		}
		resultat, _ := (&CatalogingModel.Copy{}).FindOneCopyByfilter(filter)
		return resultat, nil
	},
}

//Get All Records
//params are optional

var GetAllCopies = &graphql.Field{
	Type: graphql.NewList(CatalogingTypes.CopyType),
	Args: graphql.FieldConfigArgument{
		"BareCode": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		B := p.Args["BareCode"]

		filter := bson.M{}

		if B != nil && B != "" && B != "*" {
			filter["barecode"] = B
		}

		coll := models.DB.Collection("copies")

		//  opts := options.Find().SetSort(bson.D{{"age", 1}})

		cursor, err := coll.Find(ctx, filter)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				log.Fatal(err)
				return nil, nil
			}

		}

		var results []*CatalogingModel.Copy

		if err = cursor.All(ctx, &results); err != nil {
			log.Fatal(err)
		}
		log.Println("Length of arr: ", len(results))

		return results, nil

	},
}

var Result = graphql.NewScalar(graphql.ScalarConfig{
	Name: "Result",
	Serialize: func(value interface{}) interface{} {

		log.Println("value :", value)
		return value
	},
	ParseValue: func(value interface{}) interface{} {
		// var err error

		switch value.(type) {
		case []*CatalogingModel.Record:
			log.Println("is a record ")
			// err = validate(value.(string))
		}
		log.Println("Type value ", value)
		return value
	},
	ParseLiteral: func(valueAst ast.Value) interface{} {

		// log.Println("kinds.Name :", kinds.Name)
		if valueAst.GetKind() == kinds.Name {
			//err := validate(valueAst.GetValue().(string))
			/*if err != nil {
				panic(err)
			}*/
			log.Println("valueAst : ", valueAst)
			return valueAst
		} else {
			panic("Must be of type Object")
		}

	},
})

/*var FindManyCopyOrRecord = &graphql.Field{
	Type: Result,
	Args: graphql.FieldConfigArgument{
		"code_bar": &graphql.ArgumentConfig{Type: graphql.String},
		"title":    &graphql.ArgumentConfig{Type: graphql.String},
		"isbn":     &graphql.ArgumentConfig{Type: graphql.String},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		filter := bson.M{}
		if C := p.Args["code_bar"]; C != nil {
			filter["barecode"] = C.(string)
			resl, _ := (&CatalogingModel.Copy{}).FindManyCopy(filter) // copyTypes

			is := CirculationModel.WhoAmI(resl)
			log.Println("Tpe 1 is :", is)
			// Addreservation = is
			return resl, nil
		}
		T := p.Args["title"]
		I := p.Args["isbn"]
		log.Println(T, I)
		matchRecord := bson.D{
			{"$match", bson.D{
				{"$or", bson.A{
					bson.M{"title": T.(string)},
					bson.M{"isbn": I.(string)},
				}},
			}},
		}
		resl, _ := (&CatalogingModel.Record{}).FindBy(matchRecord) // list Record
		is := CirculationModel.WhoAmI(resl)
		log.Println("Tpe is ", is)
		return resl, nil

	},
}*/

var EnumQuery = graphql.NewObject(graphql.ObjectConfig{
	Name: "RootQuery",
	Fields: graphql.Fields{
		"echo": &graphql.Field{
			Type: graphql.String,
			Args: graphql.FieldConfigArgument{
				"order_by": &graphql.ArgumentConfig{
					Type: graphql.NewList(orderByChoicesEnum),
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				fmt.Printf("%T %#v\n", params.Args["order_by"], params.Args["order_by"])

				return "true", nil
			},
		},
	},
})

var orderByChoices = graphql.EnumValueConfigMap{
	"EffectiveDateMax": &graphql.EnumValueConfig{Value: "EffectiveDateMax"},
	"EffectiveDateMin": &graphql.EnumValueConfig{Value: "EffectiveDateMin"},
}

var orderByChoicesEnum = graphql.NewEnum(graphql.EnumConfig{
	Name:   "OrderBy",
	Values: orderByChoices,
})
