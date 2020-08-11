package authoritiesMutations

import (
	"context"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"go.mongodb.org/mongo-driver/bson"
	"time"

	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var InsertAuthorityLink = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Root_Authority_Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Root_Authority_Id": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
		"Linked_Authority_Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_Authority_Id": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
		"Start": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"End": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"Comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"LinkType": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		authorityLink := authorityModels.AuthorityLink{
		}
		if Root_Authority_Type := p.Args["Author_Type"]; Root_Authority_Type != nil {
			authorityLink.Root_Authority_Type = Root_Authority_Type.(string)
		}

		Root_Authority_Id, err := primitive.ObjectIDFromHex(p.Args["Root_Authority_Id"].(string))
		if err != nil {
			authorityLink.Root_Authority_Id = Root_Authority_Id
		}
		if Linked_Authority_Type := p.Args["Linked_Authority_Type"]; Linked_Authority_Type != nil {
			authorityLink.Linked_Authority_Type = Linked_Authority_Type.(int)
		}

		Linked_Authority_Id, err := primitive.ObjectIDFromHex(p.Args["Linked_Authority_Id"].(string))
		if err != nil {
			authorityLink.Linked_Authority_Id = Linked_Authority_Id
		}

		if Start := p.Args["Start"]; Start != nil {
			authorityLink.Start = Start.(time.Time)
		}
		if End := p.Args["End"]; End != nil {
			authorityLink.End = End.(time.Time)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			authorityLink.Comment = Comment.(string)
		}
		if LinkType := p.Args["LinkType"]; LinkType != nil {
			authorityLink.LinkType = LinkType.(int)
		}

		return authorityLink.Store()

	},
}

var UpdateAuthorityLink = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Root_Authority_Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Root_Authority_Id": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
		"Linked_Authority_Type": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_Authority_Id": &graphql.ArgumentConfig{
			Type: graphql.ID,
		},
		"Start": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"End": &graphql.ArgumentConfig{
			Type: graphql.DateTime,
		},
		"Comment": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"LinkType": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["_id"].(string))
		if err != nil {
			return nil, err
		}
		AuthorityLinkUpdate := bson.M{}
		authorityLink := authorityModels.AuthorityLink{
		}
		authorityLink.Id = _id


		if Root_Authority_Type := p.Args["Author_Type"]; Root_Authority_Type != nil {
			AuthorityLinkUpdate["author_type"] = Root_Authority_Type.(string)
		}

		Root_Authority_Id, err := primitive.ObjectIDFromHex(p.Args["Root_Authority_Id"].(string))
		if err != nil {
			AuthorityLinkUpdate["root_authority_id"] = Root_Authority_Id
		}
		if Linked_Authority_Type := p.Args["Linked_Authority_Type"]; Linked_Authority_Type != nil {
			AuthorityLinkUpdate["linked_authority_type"] = Linked_Authority_Type.(string)
		}

		Linked_Authority_Id, err := primitive.ObjectIDFromHex(p.Args["Linked_Authority_Id"].(string))
		if err != nil {
			AuthorityLinkUpdate["linked_authority_id"] = Linked_Authority_Id
		}

		if Start := p.Args["Start"]; Start != nil {
			AuthorityLinkUpdate["start"] = Start.(time.Time)
		}
		if End := p.Args["End"]; End != nil {
			AuthorityLinkUpdate["end"] = End.(time.Time)
		}
		if Comment := p.Args["Comment"]; Comment != nil {
			AuthorityLinkUpdate["comment"] = Comment.(string)
		}
		if LinkType := p.Args["LinkType"]; LinkType != nil {
			AuthorityLinkUpdate["linktype"] = LinkType.(int)
		}

		return authorityLink.Update(AuthorityLinkUpdate)

	},
}

var DeleteAuthorityLink = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("authority_link")

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
