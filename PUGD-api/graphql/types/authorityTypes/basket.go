package authorityTypes

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/models"
	"log"
	"time"

	//"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	//"go.mongodb.org/mongo-driver/mongo"
	//"log"
	//"time"
)

var BasketType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BasketType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"basket_name": &graphql.Field{
			Type: graphql.String,
		},
		"basket_note": &graphql.Field{
			Type: graphql.String,
		},
		"basket_type": &graphql.Field{
			Type: graphql.String,
		},
		"basket_color": &graphql.Field{
			Type: graphql.String,
		},
		"basket_elements": &graphql.Field{
			Type: graphql.NewList(BasketElementType),
		},
	},
})
var BasketElementType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BasketElementType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"element_type": &graphql.Field{
			Type: graphql.String,
		},
		"tag": &graphql.Field{
			Type: graphql.Boolean,
		},
		"element": &graphql.Field{
			Type: graphql.NewUnion(graphql.UnionConfig{
				Name: "OutputTypesUnion",
				Types: []*graphql.Object{
					AuthorType, CategoryType,
					AuthorityLinkType, ClassNumberType,
					CollectionTitleType, PublisherType,
					SeriesType, SubSeriesType,
					UniformTitleTypeAuthorities,
				},
				ResolveType: func(p graphql.ResolveTypeParams) *graphql.Object {
					objectMap := p.Value.(primitive.M)
					log.Println(objectMap)
					if _, ok := objectMap["name_auth"]; ok {
						return AuthorType
					}
					if _, ok := objectMap["broader_term"]; ok {
						return CategoryType
					}
					if _, ok := objectMap["address2"]; ok {
						return PublisherType
					}
					if _, ok := objectMap["subject_description"]; ok {
						return ClassNumberType
					}

					if _, ok := objectMap["parent_series"]; ok {
						return SubSeriesType
					}
					if _, ok := objectMap["issn"]; ok {
						return SeriesType
					}
					if _, ok := objectMap["expression_of"]; ok {
						return UniformTitleTypeAuthorities
					}
					if _, ok := objectMap["title"]; ok {
						return CollectionTitleType
					}
					return AuthorType
				},
			}),
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				//Get the collection name for current basket
				collectionName := p.Source.(bson.M)["element_type"].(string)
				// Get the list of ids
				elementId := p.Source.(bson.M)["element"]
				// a bson array represents a single object

				ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
				coll := models.DB.Collection(collectionName)
				var result bson.M
				err = coll.FindOne(ctx, bson.M{"_id": elementId,}).Decode(&result)
				if err != nil {
					if err == mongo.ErrNoDocuments {
						log.Println(err)
						return nil, nil
					}
				}

				return result, nil
			},
		},
	},
})
var BasketElementInputType = graphql.NewObject(graphql.ObjectConfig{
	Name: "BasketElementInputType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"element_type": &graphql.Field{
			Type: graphql.String,
		},
		"tag": &graphql.Field{
			Type: graphql.Boolean,
		},
		"element": &graphql.Field{
			Type: graphql.String,
		},
	},
})
var BasketInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "BasketInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"_id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"basket_name": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"basket_note": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"basket_type": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"basket_color": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"basket_elements": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
