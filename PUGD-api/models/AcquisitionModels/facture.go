package AcquisitionModels

import "go.mongodb.org/mongo-driver/bson/primitive"

type Facture struct {
	ID                 primitive.ObjectID   `json:"_id,omitempty" bson:"_id,omitempty"`
	Order              primitive.ObjectID   `json:"order"`
	NumFacture         string               `json:"num_facture"`
	Provider           string               `json:"provider"`
	Status             string               `json:"status"`
	Date               string               `json:"date"`         // to format
	PayementDate       string               `json:"payment_date"` // to format
	Total_ttc          float64              `json:"total_ttc"`
	Currency           string               `json:"currency"`
	Establishement     string               `json:"establishement"`
	QuantitiesFactured []float64            `json:"quantitiesFactured"`
	Order_lines        []primitive.ObjectID `json:"order_lines"`
}
