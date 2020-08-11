package AcquisitionModels

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Order struct {
	ID               primitive.ObjectID   `json:"_id" bson:"_id"`
	Type             string               `json:"type"`
	Name             string               `json:"name"`
	Quotation_number string               `json:"quotation_number"`
	Order_number     string               `json:"order_number"`
	Status           string               `json:"status"`
	Establishement   string               `json:"establishement"`
	Provider         string               `json:"provider"`
	Financial_year   string               `json:"financial_year"`
	Currency         string               `json:"currency"`
	Date             string               `json:"date"` //to convert to date
	Delivery_address string               `json:"delivery_address"`
	Billing_address  string               `json:"billing_address"`
	Notes            string               `json:"notes"`
	Order_lines      []primitive.ObjectID `json:"order_lines"`
	Orders           []primitive.ObjectID `json:"orders"`
	Received         bool                 `json:received`
	Factured         bool                 `json:factured`
}
