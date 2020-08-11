package AdministrationQueries

import (
	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
)

var GetAllSections = &graphql.Field{
	Type: graphql.NewList(AdministrationTypes.SectionType),
	Resolve: func(p graphql.ResolveParams) (interface{}, error) {
		section := AdministrationModels.Section{}
		FindAll := bson.M{}
		return section.FindAllOrBy(FindAll)
	},
}
