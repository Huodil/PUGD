package AcquisitionMutations

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models/AcquisitionModels"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//Insert new Suggestion
var InsertSuggestion = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"datepublication": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"comments": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"source": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"flag": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)

		coll := models.DB.Collection("suggestion")
		//creation of the model
		suggestion := AcquisitionModels.Suggestion{}

		if p.Args["_id"] != nil {
			if id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string)); err == nil {
				suggestion.ID = id
			} else {
				return nil, err
			}
		}

		if isbn := p.Args["isbn"]; isbn != nil {
			suggestion.Isbn = isbn.(string)
		}
		if title := p.Args["title"]; title != nil {
			suggestion.Title = title.(string)
		}
		if author := p.Args["author"]; author != nil {
			suggestion.Author = author.(string)
		}
		if quantity := p.Args["quantity"]; quantity != nil {
			suggestion.Quantity = quantity.(int)
		}
		if price := p.Args["price"]; price != nil {
			suggestion.Price = price.(float64)
		}
		if datepublication := p.Args["datepublication"]; datepublication != nil {
			suggestion.DatePublication = datepublication.(string)
		}
		if comments := p.Args["comments"]; comments != nil {
			suggestion.Comments = comments.(string)
		}
		if source := p.Args["source"]; source != nil {
			suggestion.Source = source.(string)
		}
		if flag := p.Args["flag"]; flag != nil {
			suggestion.Flag = flag.(string)
		}
		//insert the model into the database
		result, err2 := coll.InsertOne(ctx, suggestion)
		if err2 != nil {
			log.Fatal(err2)
		}
		//insert id

		return result, nil

	},
}

//Update Suggestion

var UpdateSuggestion = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"order": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"isbn": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"title": &graphql.ArgumentConfig{
			Type: graphql.String,
		},

		"author": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"quantity": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"price": &graphql.ArgumentConfig{
			Type: graphql.Float,
		},
		"datepublication": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"comments": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"source": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"flag": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("suggestion")
		//convert id from string to object id
		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		isbn := p.Args["isbn"]
		title := p.Args["title"]
		author := p.Args["author"]
		quantity := p.Args["quantity"]
		price := p.Args["price"]
		datepublication := p.Args["datepublication"]
		comments := p.Args["comments"]
		source := p.Args["source"]
		flag := p.Args["flag"]

		SuggUpdate := bson.M{}

		if isbn != nil {
			SuggUpdate["isbn"] = isbn
		}
		if title != nil {
			SuggUpdate["title"] = title
		}
		if author != nil {
			SuggUpdate["author"] = author
		}
		if quantity != nil {
			SuggUpdate["quantity"] = quantity
		}

		if price != nil {
			SuggUpdate["price"] = price
		}
		if datepublication != nil {
			SuggUpdate["datepublication"] = datepublication
		}
		if comments != nil {
			SuggUpdate["comments"] = comments
		}
		if source != nil {
			SuggUpdate["source"] = source
		}
		if flag != nil {
			SuggUpdate["flag"] = flag
		}

		result, err2 := coll.UpdateOne(ctx, bson.M{"_id": _id},

			bson.M{
				"$set": SuggUpdate,
			})
		if err2 != nil {
			log.Fatal(err2)
		}
		return result.ModifiedCount, nil

	},
}

//Delete OrderLine
var DeleteSuggestion = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("suggestion")

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
