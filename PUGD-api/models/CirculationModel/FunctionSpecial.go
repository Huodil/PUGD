package CirculationModel

import "github.com/Harmony-Technology/PUGD-api/models/CatalogingModel"

func WhoAmI(v interface{}) string {
	switch v.(type) {
	case []*CatalogingModel.Copy:
		return "CatalogingTypes.copy"
	case []*CatalogingModel.Record:
		return "CatalogingTypes.record"

	}
	return "unknown"
}
