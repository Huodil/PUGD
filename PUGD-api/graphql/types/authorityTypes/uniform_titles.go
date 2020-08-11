package authorityTypes

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"log"
	"time"
)

var UniformTitleTypeAuthorities = graphql.NewObject(graphql.ObjectConfig{
	Name: "UniformTitleTypeAuthorities",
	Fields: graphql.Fields{

		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"type": &graphql.Field{
			Type: graphql.Int,
		},
		"nature": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"expression_of": &graphql.Field{
			Type: graphql.NewList(ObjectWithDescriptionTypeUT),
		},
		"has_expression": &graphql.Field{
			Type: graphql.NewList(ObjectWithDescriptionTypeUT),
		},
		"other_links": &graphql.Field{
			Type: graphql.NewList(ObjectWithDescriptionTypeUT),
		},
		"authors": &graphql.Field{
			Type: graphql.NewList(ObjectWithDescriptionTypeAuthor),
		},
		"interpreters": &graphql.Field{
			Type: graphql.NewList(ObjectWithDescriptionTypeAuthor),
		},

		"form_text_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"form_of_work_id": &graphql.Field{
			Type: graphql.Int,
		},
		"date_of_work": &graphql.Field{
			Type: graphql.DateTime,
		},
		"original_place_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"subject_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"targeted_completeness": &graphql.Field{
			Type: graphql.Int,
		},
		"targeted_audience": &graphql.Field{
			Type: graphql.String,
		},
		"history_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"medium_of_performance": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"numeric_designation": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"key_text": &graphql.Field{
			Type: graphql.String,
		},
		"key_id": &graphql.Field{
			Type: graphql.Int,
		},
		"coordinate_system": &graphql.Field{
			Type: graphql.String,
		},
		"equinox": &graphql.Field{
			Type: graphql.String,
		},
		"form_subdivision": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"other_features": &graphql.Field{
			Type: graphql.String,
		},
		"Comment": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(AuthorityLinkType),
		},
	},
	IsTypeOf: func(p graphql.IsTypeOfParams) bool {
		return true
	},
})

var UniformTitleInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "UniformTitleInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"_id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"type": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"nature": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"expression_of": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(ObjectWithDescriptionInputType),
		},
		"has_expression": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(ObjectWithDescriptionInputType),
		},
		"other_links": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(ObjectWithDescriptionInputType),
		},
		"authors": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(ObjectWithDescriptionInputType),
		},
		"interpreters": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(ObjectWithDescriptionInputType),
		},

		"form_of_work_text": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"form_of_work_id": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"date_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.DateTime,
		},
		"original_place_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"subject_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"targeted_completeness": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"targeted_audience": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"history_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"medium_of_performance": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"numeric_designation": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"key_text": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"key_id": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"coordinate_system": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"equinox": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"form_subdivision": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"other_features": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"comment": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(AuthorityLinkInputType),
		},
	},
})
var ObjectWithDescriptionInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "ObjectWithDescriptionInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"object": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"description": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
	},
})
var ObjectWithDescriptionTypeUT = graphql.NewObject(graphql.ObjectConfig{
	Name: "ObjectWithDescriptionTypeUT",
	Fields: graphql.Fields{
		"object": &graphql.Field{
			Type: UniformTitleTypeAuthoritiesWithoutSubs,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				//Get the collection name for current basket
				objectId := p.Source.(bson.M)["object"].(primitive.ObjectID)
				log.Println(objectId)
				ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
				coll := models.DB.Collection("uniform_titles")
				var result bson.M
				err = coll.FindOne(ctx, bson.M{"_id": objectId,}).Decode(&result)
				if err != nil {
					if err == mongo.ErrNoDocuments {
						log.Println(err)
						return nil, nil
					}
				}
				return result, nil
			},
		},
		"description": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
var ObjectWithDescriptionTypeAuthor = graphql.NewObject(graphql.ObjectConfig{
	Name: "ObjectWithDescriptionTypeAuthor",
	Fields: graphql.Fields{

		"object": &graphql.Field{
			Type: AuthorTypeOutput,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				//Get the collection name for current basket
				objectId := p.Source.(bson.M)["object"].(primitive.ObjectID)
				log.Println(objectId)
				ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
				coll := models.DB.Collection("author")
				var result bson.M
				err = coll.FindOne(ctx, bson.M{"_id": objectId,}).Decode(&result)
				if err != nil {
					if err == mongo.ErrNoDocuments {
						log.Println(err)
						return nil, nil
					}
				}
				return result, nil
			},
		},
		"description": &graphql.Field{
			Type: graphql.Int,
		},
	},
})
var UniformTitleTypeAuthoritiesWithoutSubs = graphql.NewObject(graphql.ObjectConfig{
	Name: "UniformTitleTypeAuthoritiesWithoutSubs",
	Fields: graphql.Fields{

		"_id": &graphql.Field{
			Type: ObjectID,
		},
		"type": &graphql.Field{
			Type: graphql.Int,
		},
		"nature": &graphql.Field{
			Type: graphql.Int,
		},
		"name": &graphql.Field{
			Type: graphql.String,
		},
		"expression_of": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"has_expression": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"other_links": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"authors": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
		"interpreters": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},

		"form_text_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"form_of_work_id": &graphql.Field{
			Type: graphql.Int,
		},
		"date_of_work": &graphql.Field{
			Type: graphql.DateTime,
		},
		"original_place_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"subject_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"targeted_completeness": &graphql.Field{
			Type: graphql.Int,
		},
		"targeted_audience": &graphql.Field{
			Type: graphql.String,
		},
		"history_of_work": &graphql.Field{
			Type: graphql.String,
		},
		"medium_of_performance": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"numeric_designation": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"key_text": &graphql.Field{
			Type: graphql.String,
		},
		"key_id": &graphql.Field{
			Type: graphql.Int,
		},
		"coordinate_system": &graphql.Field{
			Type: graphql.String,
		},
		"equinox": &graphql.Field{
			Type: graphql.String,
		},
		"form_subdivision": &graphql.Field{
			Type: graphql.NewList(graphql.String),
		},
		"other_features": &graphql.Field{
			Type: graphql.String,
		},
		"Comment": &graphql.Field{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.Field{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.Field{
			Type: graphql.NewList(ObjectID),
		},
	},
	IsTypeOf: func(p graphql.IsTypeOfParams) bool {
		return true
	},
})
var UniformTitleQueryInputType = graphql.NewInputObject(graphql.InputObjectConfig{
	Name: "UniformTitleQueryInputType",
	Fields: graphql.InputObjectConfigFieldMap{
		"_id": &graphql.InputObjectFieldConfig{
			Type: graphql.ID,
		},
		"type": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"nature": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"name": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"expression_of": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
		"has_expression": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
		"other_links": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
		"authors": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
		"interpreters": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},

		"form_of_work_text": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"form_of_work_id": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"date_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.DateTime,
		},
		"original_place_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"subject_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"targeted_completeness": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"targeted_audience": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"history_of_work": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"medium_of_performance": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"numeric_designation": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"key_text": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"key_id": &graphql.InputObjectFieldConfig{
			Type: graphql.Int,
		},
		"coordinate_system": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"equinox": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"form_subdivision": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.String),
		},
		"other_features": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"comment": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"url_thumbnail": &graphql.InputObjectFieldConfig{
			Type: graphql.String,
		},
		"linked_authorities": &graphql.InputObjectFieldConfig{
			Type: graphql.NewList(graphql.ID),
		},
	},
})
