package authoritiesMutations

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

var InsertBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"basket": &graphql.ArgumentConfig{
			Type: authorityTypes.BasketInputType,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		inputObject := p.Args["basket"]

		jsonbody, err := json.Marshal(inputObject)
		if err != nil {
			fmt.Println(err)
			return nil, err
		}
		basket := authorityModels.Basket{}
		if err := json.Unmarshal(jsonbody, &basket); err != nil {
			fmt.Println(err)
			return nil, err
		}
		return basket.Store()
	},
}
var AddToBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"BasketId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"ElementId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"ElementType": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("basket")
		// Convert the id of the basket
		var basketId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["BasketId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			basketId = id
		}
		var ElementId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["ElementId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			ElementId = id
		}
		element := bson.D{
			{"element", ElementId},
			{"element_type", p.Args["ElementType"].(string)},
			{"tag", false},
		}
		result, err2 := coll.UpdateOne(ctx,
			bson.M{"_id": basketId},
			bson.M{
				"$addToSet": bson.M{
					"basket_elements": element,
				},
			})
		if err2 != nil {

			return 0, errors.New(err2.Error())
		}
		return result.ModifiedCount, nil
	},
}
var UpdateBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"BasketName": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BasketNote": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BasketType": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BasketColor": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"BasketElements": &graphql.ArgumentConfig{
			Type: graphql.NewList(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}

		basket := authorityModels.Basket{
		}
		BasketUpdate := bson.M{}

		basket.Id = _id

		if BasketName := p.Args["BasketName"]; BasketName != nil {
			BasketUpdate["basket_name"] = BasketName.(string)
		}
		if BasketNote := p.Args["BasketNote"]; BasketNote != nil {
			BasketUpdate["basket_note"] = BasketNote.(string)
		}
		if BasketType := p.Args["BasketType"]; BasketType != nil {
			BasketUpdate["basket_type"] = BasketType.(string)
		}
		if BasketColor := p.Args["BasketColor"]; BasketColor != nil {
			BasketUpdate["basket_color"] = BasketColor.(string)
		}

		return basket.Update(BasketUpdate)

	},
}

var DeleteBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("basket")

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}

		resultDelete, err := coll.DeleteOne(ctx, bson.M{"_id": _id})
		if err != nil {
			return nil, err
		}

		return resultDelete.DeletedCount, nil

	},
}

var RemoveFromBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"BasketId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"ElementId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("basket")
		// Convert the id of the basket
		var basketId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["BasketId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			basketId = id
		}
		var ElementId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["ElementId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			ElementId = id
		}
		element := bson.D{
			{"element", ElementId},
		}

		result, err2 := coll.UpdateOne(ctx,
			bson.M{"_id": basketId},
			bson.M{
				"$pull": bson.M{
					"basket_elements": element,
				},
			})
		if err2 != nil {

			return 0, errors.New(err2.Error())
		}
		return result.ModifiedCount, nil
	},
}
var TagElementInBasket = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"BasketId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"ElementId": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.ID),
		},
		"tag": &graphql.ArgumentConfig{
			Type: graphql.Boolean,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("basket")
		// Convert the id of the basket
		var basketId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["BasketId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			basketId = id
		}
		var ElementId = primitive.ObjectID{}
		if idHex, idHexOk := p.Args["ElementId"].(string); idHexOk {
			id, err := primitive.ObjectIDFromHex(idHex)
			if err != nil {
				return nil, err
			}
			ElementId = id
		}
		var elementTag = false
		if tag, tagOk := p.Args["tag"].(bool); tagOk {
			if !tagOk {
				return nil, errors.New("Bad Tag")
			}
			elementTag = tag
		}
		result, err2 := coll.UpdateOne(ctx,
			bson.D{
				{"_id", basketId},
				{"basket_elements.element", ElementId},
			},
			bson.M{
				"$set": bson.M{
					"basket_elements.$.tag": elementTag,
				},
			})
		if err2 != nil {

			return 0, errors.New(err2.Error())
		}
		return result.ModifiedCount, nil
	},
}
