package authoritiesMutations

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/graphql/types/authorityTypes"
	"github.com/Harmony-Technology/PUGD-api/models"
	"github.com/Harmony-Technology/PUGD-api/models/authorityModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"time"
)

var InsertAuthor = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Name_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Author_Type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"IndexName_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Year_Birth": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Year_Death": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"City_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Country_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"WebSite_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ISNI_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Subdivision_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"UrlThumbnail_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Note_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Linked_authorities": &graphql.ArgumentConfig{
			Type: graphql.NewList(authorityTypes.AuthorityLinkInputType),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		author := authorityModels.Author{
		}
		if AuthorType := p.Args["Author_Type"]; AuthorType != nil {
			author.Author_Type = AuthorType.(int)
		}
		if NameAuth := p.Args["Name_Auth"]; NameAuth != nil {
			author.Name_Auth = NameAuth.(string)
		}
		if IndexNameAuth := p.Args["IndexName_Auth"]; IndexNameAuth != nil {
			author.IndexName_Auth = IndexNameAuth.(string)
		}
		if Year_Birth := p.Args["Year_Birth"]; Year_Birth != nil {
			author.Year_Birth = Year_Birth.(int)
		}
		if Year_Death := p.Args["Year_Death"]; Year_Death != nil {
			author.Year_Death = Year_Death.(int)
		}

		if CityAuth := p.Args["City_Auth"]; CityAuth != nil {
			author.City_Auth = CityAuth.(string)
		}
		if CountryAuth := p.Args["Country_Auth"]; CountryAuth != nil {
			author.Country_Auth = CountryAuth.(string)
		}
		if WebsiteAuth := p.Args["WebSite_Auth"]; WebsiteAuth != nil {
			author.WebSite_Auth = WebsiteAuth.(string)
		}
		if IsniAuth := p.Args["ISNI_Auth"]; IsniAuth != nil {
			author.ISNI_Auth = IsniAuth.(string)
		}
		if SubdivisionAuth := p.Args["Subdivision_Auth"]; SubdivisionAuth != nil {
			author.Subdivision_Auth = SubdivisionAuth.(string)
		}
		if UrlthumbnailAuth := p.Args["UrlThumbnail_Auth"]; UrlthumbnailAuth != nil {
			author.UrlThumbnail_Auth = UrlthumbnailAuth.(string)
		}
		if NoteAuth := p.Args["Note_Auth"]; NoteAuth != nil {
			author.Note_Auth = NoteAuth.(string)
		}
		if LinkedAuthorities := p.Args["Linked_authorities"]; LinkedAuthorities != nil {
			var LinkedAuthoritiesIdList = []primitive.ObjectID{}
			LinkedAuthoritiesList := LinkedAuthorities.([]interface{})
			for i := 0; i < len(LinkedAuthoritiesList); i++ {
				at := LinkedAuthoritiesList[i].(map[string]interface{})
				authorityLink := authorityModels.AuthorityLink{}
				authorityLink.ConvertAuthorityLink(at)
				id, err := authorityLink.Store()
				if err == nil {
					LinkedAuthoritiesIdList = append(LinkedAuthoritiesIdList, *id)
				}
			}
			author.Linked_authorities = LinkedAuthoritiesIdList
		}
		return author.Store()
	},
}

var UpdateAuthor = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"Id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
		"Author_Type": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Name_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"IndexName_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Year_Birth": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"Year_Death": &graphql.ArgumentConfig{
			Type: graphql.Int,
		},
		"City_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Country_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"WebSite_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"ISNI_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Subdivision_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"UrlThumbnail_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"Note_Auth": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {

		_id, err := primitive.ObjectIDFromHex(p.Args["Id"].(string))
		if err != nil {
			return nil, err
		}

		author := authorityModels.Author{
		}
		AuthorUpdate := bson.M{}

		author.Id = _id

		if AuthorType := p.Args["Author_Type"]; AuthorType != nil {
			AuthorUpdate["author_Type"] = AuthorType.(int)
		}
		if NameAuth := p.Args["Name_Auth"]; NameAuth != nil {
			AuthorUpdate["name_auth"] = NameAuth.(string)
		}
		if IndexNameAuth := p.Args["IndexName_Auth"]; IndexNameAuth != nil {
			AuthorUpdate["indexname_auth"] = IndexNameAuth.(string)
		}

		if Year_Birth := p.Args["Year_Birth"]; Year_Birth != nil {
			AuthorUpdate["year_birth"] = Year_Birth.(int)
		}
		if Year_Death := p.Args["Year_Death"]; Year_Death != nil {
			AuthorUpdate["year_death"] = Year_Death.(int)
		}
		if CityAuth := p.Args["City_Auth"]; CityAuth != nil {
			AuthorUpdate["city_auth"] = CityAuth.(string)
		}
		if CountryAuth := p.Args["Country_Auth"]; CountryAuth != nil {
			AuthorUpdate["country_auth"] = CountryAuth.(string)
		}
		if WebsiteAuth := p.Args["WebSite_Auth"]; WebsiteAuth != nil {
			AuthorUpdate["website_auth"] = WebsiteAuth.(string)
		}
		if IsniAuth := p.Args["ISNI_Auth"]; IsniAuth != nil {
			AuthorUpdate["isni_auth"] = IsniAuth.(string)
		}
		if SubdivisionAuth := p.Args["Subdivision_Auth"]; SubdivisionAuth != nil {
			AuthorUpdate["subdivision_auth"] = SubdivisionAuth.(string)
		}
		if UrlthumbnailAuth := p.Args["UrlThumbnail_Auth"]; UrlthumbnailAuth != nil {
			AuthorUpdate["url_thumbnail_auth"] = UrlthumbnailAuth.(string)
		}
		if NoteAuth := p.Args["Note_Auth"]; NoteAuth != nil {
			AuthorUpdate["note_auth"] = NoteAuth.(string)
		}

		return author.Update(AuthorUpdate)

	},
}

var DeleteAuthor = &graphql.Field{
	Type: graphql.String,
	Args: graphql.FieldConfigArgument{
		"_id": &graphql.ArgumentConfig{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		coll := models.DB.Collection("author")

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
