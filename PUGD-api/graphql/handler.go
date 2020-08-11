package graphql

import (
	"fmt"

	"github.com/Harmony-Technology/PUGD-api/graphql/mutations/AcquisitionMutations"

	"github.com/Harmony-Technology/PUGD-api/graphql/mutations/AdministrationMutations"

	"github.com/Harmony-Technology/PUGD-api/graphql/mutations/CirculationMutation"
	"github.com/Harmony-Technology/PUGD-api/graphql/queries/AcquisitionQueries"
	"github.com/Harmony-Technology/PUGD-api/graphql/queries/AdministrationQueries"

	"github.com/Harmony-Technology/PUGD-api/graphql/mutations/CatalogingMutations"

	"github.com/Harmony-Technology/PUGD-api/graphql/queries/CatalogingQueries"
	"github.com/Harmony-Technology/PUGD-api/graphql/queries/CirculationQueries"

	"log"

	"github.com/Harmony-Technology/PUGD-api/graphql/mutations"
	"github.com/Harmony-Technology/PUGD-api/graphql/mutations/authoritiesMutations"
	"github.com/Harmony-Technology/PUGD-api/graphql/queries"
	"github.com/Harmony-Technology/PUGD-api/graphql/queries/authorityQueries"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
)

func Handler() gin.HandlerFunc {
	fmt.Println("executed")
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		//Queries

		Query: graphql.NewObject(
			graphql.ObjectConfig{Name: "QueryType", Fields: graphql.Fields{

				// Author queries
				// Au
				"book":  queries.BookQuery,
				"books": queries.GetAllBooks,
				"login": queries.Login,

				/*
					Authorities Modules -- Start
				*/
				// Author queries
				"author":            authorityQueries.GetAuthors,
				"author_all_fields": authorityQueries.GetAuthorsAllFields,
				// Category queries
				"category_authority":  authorityQueries.GetCategories,
				"category_all_fields": authorityQueries.GetCategoriesAllFields,
				// Category queries
				"publisher":            authorityQueries.GetPublishers,
				"publisher_all_fields": authorityQueries.GetPublishersAllFields,
				// Series queries
				"series":            authorityQueries.GetSeries,
				"series_all_fields": authorityQueries.GetSeriesAllFields,
				// SubSeries queries
				"sub_series":            authorityQueries.GetSubSeries,
				"sub_series_all_fields": authorityQueries.GetSubSeriesAllFields,
				// Collection Title queries
				"collection_title": authorityQueries.GetCollectionTitle,
				// Class number queries
				"class_number": authorityQueries.GetClassNumberTitle,
				// basket queries
				"basket": authorityQueries.GetBaskets,

				//synonym queries
				"synonym": authorityQueries.GetSynonym,

				"authority_link": authorityQueries.GetAuthorityLink,
				"uniform_title":  authorityQueries.GetUniformTitles,

				"stopword": authorityQueries.GetStopword,

				"GetAllAuthorities": authorityQueries.GetAuthorities,
				/*
					Authorities Modules -- End
				*/

				/*
					Acquisition Modules -- Start
				*/
				"getoneprovider":      AcquisitionQueries.GetOneProvider,
				"getallproviders":     AcquisitionQueries.GetAllProviders,
				"getOneOrderLine":     AcquisitionQueries.GetOrderLine,
				"getAllOrderLines":    AcquisitionQueries.GetAllOrderLines,
				"getOrder":            AcquisitionQueries.GetOrder,
				"getOrders":           AcquisitionQueries.GetOrders,
				"getDeliverLine":      AcquisitionQueries.GetDeliveryLine,
				"getAllDeliveryLines": AcquisitionQueries.GetAllDeliveryLines,
				"getFactures":         AcquisitionQueries.GetFactures,
				"getsuggestion":       AcquisitionQueries.GetSuggestion,
				"getsuggestions":      AcquisitionQueries.GetSuggestions,
				/*
					Acquisition Modules -- End
				*/
				/*
					Cataloging Modules -- Start
				*/

				// cataloging queries
				"ReturnCopy": CirculationQueries.ReturnCopy,

				"record":  CatalogingQueries.GetOneRecord,
				"records": CatalogingQueries.GetAllRecords,
				"serial":  CatalogingQueries.GetOneSerial,
				"serials": CatalogingQueries.GetAllSerials,
				"copy":    CatalogingQueries.GetOneCopy,
				"copies":  CatalogingQueries.GetAllCopies,

				"branch":        CatalogingQueries.GetOneBranch,
				"branches":      CatalogingQueries.GetAllBranches,
				"keyword":       CatalogingQueries.GetOneKeyword,
				"keywords":      CatalogingQueries.GetAllKeywords,
				"language":      CatalogingQueries.GetOneLanguague,
				"languages":     CatalogingQueries.GetAllLanguagues,
				"library":       CatalogingQueries.GetOneLibrary,
				"libraries":     CatalogingQueries.GetAllLibraries,
				"function":      CatalogingQueries.GetOneFunction,
				"functions":     CatalogingQueries.GetAllFunctions,
				"uniformtitle":  CatalogingQueries.GetOneUniformTitle,
				"uniformtitles": CatalogingQueries.GetAllUniformTitles,

				//  queries Circulation Module
				"getOneReservation":         CirculationQueries.GetOneReservation,
				"GetAllReservation":         CirculationQueries.GetAllReservations,
				"GetOneBorrower":            CirculationQueries.GetOneBorrower,
				"GetAllBorrowers":           CirculationQueries.GetAllBorrowers,
				"GetOneRelance":             CirculationQueries.GetOneRelance,
				"GetAllRelances":            CirculationQueries.GetAllRelances,
				"GetOneSubscription":        CirculationQueries.GetOneSubscription,
				"GetAllSubscriptions":       CirculationQueries.GetAllSubscriptions,
				"GetOneCategorieBorrower":   CirculationQueries.GetOneCategorieBorrower,
				"GetAllCategoriesBorrowers": CirculationQueries.GetAllCategoriesBorrowers,

				// queries Reporting Module

				//todo Groups Query to complet
				"GetAllGrroups":   CirculationQueries.GetAllGrroups,
				"GetGroupsByName": CirculationQueries.GetGroupsByName,

				// status , section , Owners , MediaTypes
				"GetAllStatus":     AdministrationQueries.GetAllStatus,
				"GetAllSections":   AdministrationQueries.GetAllSections,
				"GetAllOwners":     AdministrationQueries.GetAllOwners,
				"GetOneOwner":      AdministrationQueries.GetOneOwner,
				"GetAllMediaTypes": AdministrationQueries.GetAllMediaTypes,

				// done get All Borrowers
				//Pret du document
				"GetPretOfBorrower": CirculationQueries.GetPretOfBorrower,
				"GetAllPret":        CirculationQueries.GetAllPret,
				//Status Borrowers
				"GetOneStatusBorrowers": AdministrationQueries.GetOneStatusBorrowers,
				"GetAllStatusBorrowers": AdministrationQueries.GetAllStatusBorrowers,

				// Code Statics
				"GetAllCodeStatics": AdministrationQueries.GetAllCodeStatics,
				"GetOneCodeStatic":  AdministrationQueries.GetOneCodeStatic,

				// Reservation
				"GetReservationForBorrower": CirculationQueries.GetReservationForBorrower,
				"GetSpecialReservation":     CirculationQueries.GetSpecialReservation,
				//"CheckReservation":     CirculationQueries.CheckReservation,

				//"FindManyOrOne": CatalogingQueries.FindManyCopyOrRecord,

				"FindReservation":                   CirculationQueries.FindReservation,
				"GetBorrowerWithPretAndReservation": CirculationQueries.GetBorrowerWithPretAndReservation,
			}},
		),
		Mutation: graphql.NewObject(
			graphql.ObjectConfig{Name: "MutationType", Fields: graphql.Fields{

				/*
					Authorities Modules -- Start
				*/
				"insertOneBook": mutations.InsertOneBook,
				"updateOneBook": mutations.UpdateOneBook,
				"deleteOneBook": mutations.DeleteOneBook,
				"register":      mutations.Register,
				//Author Mutation
				"InsertAuthor": authoritiesMutations.InsertAuthor,
				"UpdateAuthor": authoritiesMutations.UpdateAuthor,
				"DeleteAuthor": authoritiesMutations.DeleteAuthor,
				//Category Mutation
				"InsertCategory": authoritiesMutations.InsertCategory,
				"UpdateCategory": authoritiesMutations.UpdateCategory,
				"DeleteCategory": authoritiesMutations.DeleteCategory,
				//AuthorityLink Mutation
				"InsertAuthorityLink": authoritiesMutations.InsertAuthorityLink,
				"UpdateAuthorityLink": authoritiesMutations.UpdateAuthorityLink,
				"DeleteAuthorityLink": authoritiesMutations.DeleteAuthorityLink,
				//Publisher Mutation
				"InsertPublisher": authoritiesMutations.InsertPublisher,
				"UpdatePublisher": authoritiesMutations.UpdatePublisher,
				"DeletePublisher": authoritiesMutations.DeletePublisher,
				//Series Mutation
				"InsertSeries": authoritiesMutations.InsertSeries,
				"UpdateSeries": authoritiesMutations.UpdateSeries,
				"DeleteSeries": authoritiesMutations.DeleteSeries,
				//Sub series Mutation
				"InsertSubSeries": authoritiesMutations.InsertSubSeries,
				"UpdateSubSeries": authoritiesMutations.UpdateSubSeries,
				"DeleteSubSeries": authoritiesMutations.DeleteSubSeries,
				//Collection title Mutation
				"InsertCollectionTitle": authoritiesMutations.InsertCollectionTitle,
				"UpdateCollectionTitle": authoritiesMutations.UpdateCollectionTitle,
				"DeleteCollectionTitle": authoritiesMutations.DeleteCollectionTitle,
				//Class number Mutation
				"InsertClassNumber": authoritiesMutations.InsertClassNumber,
				"UpdateClassNumber": authoritiesMutations.UpdateClassNumber,
				"DeleteClassNumber": authoritiesMutations.DeleteClassNumber,
				//Basket Mutation
				"InsertBasket":       authoritiesMutations.InsertBasket,
				"UpdateBasket":       authoritiesMutations.UpdateBasket,
				"DeleteBasket":       authoritiesMutations.DeleteBasket,
				"AddToBasket":        authoritiesMutations.AddToBasket,
				"RemoveFromBasket":   authoritiesMutations.RemoveFromBasket,
				"TagElementInBasket": authoritiesMutations.TagElementInBasket,
				// Uniform title mutations

				"InsertUniformTitle": authoritiesMutations.InsertUniformTitle,
				"UpdateUniformTitle": authoritiesMutations.UpdateUniformTitle,
				"DeleteUniformTitle": authoritiesMutations.DeleteUniformTitle,
				//synonym mutations
				"InsertSynonym": authoritiesMutations.InsertSynonym,
				"UpdateSynonym": authoritiesMutations.UpdateSynonym,
				"DeleteSynonym": authoritiesMutations.DeleteSynonym,
				//stopword mutations
				"InsertStopword": authoritiesMutations.InsertStopword,
				"UpdateStopword": authoritiesMutations.UpdateStopword,
				"DeleteStopword": authoritiesMutations.DeleteStopword,

				/*
					Authorities Modules -- End
				*/
				/*
					Acquisition Modules -- Start
				*/
				// Provider mutations(insert, update, delete)
				"insertProvider": AcquisitionMutations.InsertProvider,
				"updateProvider": AcquisitionMutations.UpdateProvider,
				"deleteProvider": AcquisitionMutations.DeleteProvider,
				// Order mutations(insert, update, delete)
				"insertOrder": AcquisitionMutations.InsertOrder,
				"updateOrder": AcquisitionMutations.UpdateOrder,
				"deleteOrder": AcquisitionMutations.DeleteOrder,
				// OrderLine mutations(insert, update, delete)
				"insertOrderLine": AcquisitionMutations.InsertOrderLine,
				"updateOrderLine": AcquisitionMutations.UpdateOrderLine,
				"deleteOrderLine": AcquisitionMutations.DeleteOrderLine,
				// Delivery Line
				"insertDeliveryLine": AcquisitionMutations.InsertDeliveryLine,
				// Facture
				"insertFacture": AcquisitionMutations.InsertFacture,
				"deleteFacture": AcquisitionMutations.DeleteFacture,
				// Suggestion
				"insertsuggestion": AcquisitionMutations.InsertSuggestion,
				"updatesuggestion": AcquisitionMutations.UpdateSuggestion,
				"deletesuggestion": AcquisitionMutations.DeleteSuggestion,
				/*
					Acquisition Modules -- End
				*/

				/*
					cataloging Modules -- Start
				*/
				// Record mutations(insert, update, delete)
				"insertOneRecord": CatalogingMutations.InsertOneRecord,
				"updateOneRecord": CatalogingMutations.UpdateOneRecord,
				"deleteOneRecord": CatalogingMutations.DeleteOneRecord,
				// Serial mutations(insert, update, delete)
				"insertOneSerial": CatalogingMutations.InsertOneSerial,
				"updateOneSerial": CatalogingMutations.UpdateOneSerial,
				"deleteOneSerial": CatalogingMutations.DeleteOneSerial,
				// Branch mutation(insert, update, delete)
				"insertOneBranch": CatalogingMutations.InsertOneBranch,
				"updateOneBranch": CatalogingMutations.UpdateOneBranch,
				"deleteOneBranch": CatalogingMutations.DeleteOneBranch,
				// keyword mutation(insert, update, delete)
				"insertOneKeyword": CatalogingMutations.InsertOneKeyWord,
				"updateOneKeyword": CatalogingMutations.UpdateOneKeyWord,
				"deleteOneKeyword": CatalogingMutations.DeleteOneKeyWord,
				// Language mutation(insert, update, delate)
				"insertOneLanguage": CatalogingMutations.InsertOneLanguage,
				"updateOneLanguage": CatalogingMutations.UpdateOneLanguage,
				"deleteOneLanguage": CatalogingMutations.DeleteOneLanguage,
				// function mutation(insert, update, delate)
				"insertOneFunction": CatalogingMutations.InsertOneFunction,
				"updateOneFunction": CatalogingMutations.UpdateOneFunction,
				"deleteOneFunction": CatalogingMutations.DeleteOneFunction,
				// Library mutation(insert, update, delete)
				"insertOneLibrary": CatalogingMutations.InsertOneLibrary,
				"updateOneLibrary": CatalogingMutations.UpdateOneLibrary,
				"deleteOneLibrary": CatalogingMutations.DeleteOneLibrary,
				// UniformTitle mutation(insert, update, delete)
				"insertOneUniformTitle": CatalogingMutations.InsertOneUniformTitle,
				"updateOneUniformTitle": CatalogingMutations.UpdateOneUniformTitle,
				"deleteOneUniformTitle": CatalogingMutations.DeleteOneUniformTitle,
				// Copy mutation(insert, update, delete)
				"insertOneCopy": CatalogingMutations.InsertOneCopy,
				"updateOneCopy": CatalogingMutations.UpdateOneCopy,
				"deleteOneCopy": CatalogingMutations.DeleteOneCopy,
				/*
					cataloging Modules -- End
				*/

				/*
					Circulation Modules -- Start
				*/
				// reservation mutations(insert, update, delete)
				"InsertReservation": CirculationMutation.InsertOneReservation,
				"UpdateReservation": CirculationMutation.UpdateOneReservation,
				"DeleteReservation": CirculationMutation.DeleteOneReservation,

				// borrower mutations(insert, update,  delete)
				"InsertOneBorrower": CirculationMutation.InsertOneBorrower,
				"UpdateOneBorrower": CirculationMutation.UpdateOneBorrower,
				"DeleteOneBorrower": CirculationMutation.DeleteOneBorrower,

				// relance mutations(insert, update, delete)
				"InsertRelance": CirculationMutation.InsertOneRelance,
				"UpdateRelance": CirculationMutation.UpdateOneRelance,
				"DeleteRelance": CirculationMutation.DeleteOneRelance,

				// subscription mutations(insert, update, delete)
				"InsertSubscription": CirculationMutation.InsertOneSubscription,
				"UpdateSubscription": CirculationMutation.UpdateOneSubscription,
				"DeleteSubscription": CirculationMutation.DeleteOneSubscription,

				// categorie_borrowers mutations(insert, update, delete)
				"InsertOne_Categ_Borrower": CirculationMutation.InsertOneCateg_Borrower,
				"UpdateOne_Categ_Brrower":  CirculationMutation.UpdateOneCateg_Brrower,
				"DeleteOne_Categ_Borrower": CirculationMutation.DeleteOneCateg_Borrower,

				// Groups mutations(insert, update, delete)
				"InsertOneGroup":      CirculationMutation.InsertOneGroup,
				"InsertOneSuggestion": CirculationMutation.InsertOneSuggestion,

				// Add
				"InsertOneSection":   AdministrationMutations.InsertOneSection,
				"InsertOneStatus":    AdministrationMutations.InsertOneStatus,
				"InsertOneOwner":     AdministrationMutations.InsertOneOwner,
				"InsertOneMediaType": AdministrationMutations.InsertOneMediaType,
				// Update
				"UpdateOneSection":   AdministrationMutations.UpdateOneSection,
				"UpdateOneStatus":    AdministrationMutations.UpdateOneStatus,
				"UpdateOneOwner":     AdministrationMutations.UpdateOneOwner,
				"UpdateOneMediaType": AdministrationMutations.UpdateOneMediaType,
				// Delate
				"DeleteOneSetion":    AdministrationMutations.DeleteOneSetion,
				"DeleteOneStatus":    AdministrationMutations.DeleteOneStatus,
				"DeleteOneOwner":     AdministrationMutations.DeleteOneOwner,
				"DeleteOneMediaType": AdministrationMutations.DeleteOneMediaType,

				// Pret
				"InsertOnePret": CirculationMutation.InsertOnePret,
				"UpdateOnePret": CirculationMutation.UpdateOnePret,
				"DeleteOnePret": CirculationMutation.DeleteOnePret,
				// Status Borrowers ( lik : Active / InActive / ...Or other Custom profile )
				"InsertOneStatusBorrowers": AdministrationMutations.InsertOneStatusBorrowers,
				"UpdateOneStatusBorrowers": AdministrationMutations.UpdateOneStatusBorrowers,
				"DeleteOneStatusBorrowers": AdministrationMutations.DeleteOneStatusBorrowers,
				// Static Code Borrowers ( lik : Commun / Hors Commun / .... )
				"InsertOneCodeStatic": AdministrationMutations.InsertOneCodeStatic,
				"UpdateOneCodeStatic": AdministrationMutations.UpdateOneCodeStatic,
				"DeleteOneCodeStatic": AdministrationMutations.DeleteOneCodeStatic,
			}},
		),
	})

	if err != nil {
		log.Fatal(err)
	}
	h := handler.New(&handler.Config{
		Schema:     &schema,
		Pretty:     true,
		GraphiQL:   true,
		Playground: true,
	})

	return func(c *gin.Context) {
		//MyContextHandler(c, c.Writer, c.Request,h)
		h.ServeHTTP(c.Writer, c.Request)
	}

}
