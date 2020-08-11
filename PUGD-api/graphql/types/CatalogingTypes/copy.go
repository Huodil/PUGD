package CatalogingTypes

import (
	"log"

	"github.com/Harmony-Technology/PUGD-api/graphql/types/AdministrationTypes"
	"github.com/Harmony-Technology/PUGD-api/models/AdministrationModels"
	"github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"
	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var CopyType = graphql.NewObject(graphql.ObjectConfig{
	Name: "CopyType",
	Fields: graphql.Fields{
		"_id": &graphql.Field{
			Type: graphql.ID,
		},
		"BareCode": &graphql.Field{
			Type: graphql.String,
		},
		"Price": &graphql.Field{
			Type: graphql.Float,
		},
		"ReplacementPrice": &graphql.Field{
			Type: graphql.Float,
		},
		"DateLastBorrowed": &graphql.Field{
			Type: graphql.String,
		},
		"DateLastSeen": &graphql.Field{
			Type: graphql.String,
		},
		"Stack": &graphql.Field{
			Type: graphql.String,
		},
		"NoteForLoan": &graphql.Field{
			Type: graphql.Boolean,
		},
		"WithDrawn": &graphql.Field{
			Type: graphql.Boolean,
		},
		"Reserves": &graphql.Field{
			Type: graphql.Int,
		},
		"Restricted": &graphql.Field{
			Type: graphql.String,
		},
		"Cote": &graphql.Field{
			Type: graphql.String,
		},
		"CopyNumber": &graphql.Field{
			Type: graphql.Int,
		},
		"NewStatus": &graphql.Field{
			Type: graphql.String,
		},
		"CodeStatic": &graphql.Field{
			Type: AdministrationTypes.CodeStaticType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).CodeStatic.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				CodeStatic, _ := (&AdministrationModels.CodeStatic{}).FindStatusByID(id)
				if CodeStatic == nil {

					return nil, nil
				}
				return CodeStatic, nil
			},
		},
		"Localisation": &graphql.Field{
			Type: LibraryType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).Localisation.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Localisation, ero := CatalogingModel.FindLibraryByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return Localisation, nil
			},
		},
		"Status": &graphql.Field{
			Type: AdministrationTypes.StatusType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).Status.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Status, ero := (&AdministrationModels.Status{}).FindStatusByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return Status, nil
			},
		},
		"MediaType": &graphql.Field{
			Type: AdministrationTypes.MediaType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).MediaType.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				MediaType, ero := (&AdministrationModels.MediaTypes{}).FindMediaTypeByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return MediaType, nil
			},
		},
		"Owner": &graphql.Field{
			Type: AdministrationTypes.OwnerType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).Owner.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Owner, ero := (&AdministrationModels.Owner{}).FindOne(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return Owner, nil
			},
		},
		"Section": &graphql.Field{
			Type: AdministrationTypes.SectionType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).Section.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Section, ero := (&AdministrationModels.Section{}).FindOne(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return Section, nil
			},
		},
		"Record": &graphql.Field{
			Type: RecordType,
			Resolve: func(p graphql.ResolveParams) (i interface{}, err error) {
				id, err := primitive.ObjectIDFromHex(p.Source.(*CatalogingModel.Copy).Record.Hex())
				log.Print("==>> ", id)
				if err != nil {
					log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
				}
				Record, ero := CatalogingModel.FindRecordByID(id)
				if ero != nil {
					log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
					return nil, ero
				}
				return Record, nil
			},
		},
	},
	/*"Br": &graphql.Field{
		Type: CirculationTypes.BorrowerType,
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			id, err := primitive.ObjectIDFromHex(p.Source.(*CirculationModel.Borrower).Barcode)
			log.Print("==>> ", id)
			if err != nil {
				log.Printf("path => %s  \n----->Error Type => : Ligne %s ", p.Info.Path.AsArray(), err.Error())
			}
			Borrower, ero := (&CirculationModel.CategoriesBrrowers{}).FindOne(id)
			if ero != nil {
				log.Printf("path => %s  \n----->Error Type => : %s Ligne :", p.Info.Path.AsArray(), ero)
				return nil, ero
			}
			return Borrower, nil

		},
	},*/
})
