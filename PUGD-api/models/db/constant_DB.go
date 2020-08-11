package db

const (
	// variable de connection a la base de donneé
	Db_Local  = "DB_Local"
	DB_Remote = "DB_Remote"
	DbName    = "Db_NAME"

	// variable de Collection du base de donneé
	CollectionUser = "COLLECTION_USER"
	CollectionBook = "COLLECTION_BOOK"

	// M1---------->> Collection Package Cataloging
	Copies  = "COLLECTION_COPIES"
	Records = "COLLECTION_RECORDS"

	// M2---------->> Collection Package Circulation
	Borrowers           = "COLLECTION_BORROWERS"
	CategoriesBorrowers = "COLLECTION_CATEGORIES_BORROWERS"
	Groups              = "COLLECTION_GROUPS"
	Relances            = "COLLECTION_RELANCES"
	Reservations        = "COLLECTION_RESERVATIONS"
	Pret                = "COLLECTION_PRETS"
	ReservationsView    = "COLLECTION_RESERVATIONS_VIEW"
	Subscriptions       = "COLLECTION_SUBSCRIPTIONS"
	Suggestion          = "COLLECTION_SUGGESTION"

	// M3---------->> Collection Package Acquisition
	CollectionOrder     = "COLLECTION_ORDER"
	CollectionOrderLine = "COLLECTION_ORDER_Line"
	CollectionProviders = "COLLECTION_PROVIDERS"

	// M4---------->> Collection Package Administration
	Status          = "COLLECTION_STATUS"
	Section         = "COLLECTION_SECTION"
	Localisation    = "COLLECTION_LOCALISATION" //  Library
	Owner           = "COLLECTION_OWENS"
	MediaTypes      = "COLLECTION_MEDIA_TYPES"
	StatusBorrowers = "COLLECTION_STATUS_BORROWERS"
	CodeStatic      = "COLLECTION_CODE_STATIC"
)
