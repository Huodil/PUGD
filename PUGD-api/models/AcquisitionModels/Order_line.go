package AcquisitionModels

import "go.mongodb.org/mongo-driver/bson/primitive"

type Order_Line struct {
	ID               primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Order            primitive.ObjectID `json:"Order"`
	Isbn             string             `json:"isbn"`
	Title            string             `json:"title"`
	Author           string             `json:"author"`
	Quantity         int                `json:"quantity"`
	QuantityReceived int                `json:"quantityreceived"`
	QuantityFactured int                `json:"quantityfactured"`
	Price            float64            `json:"price"`
	Discount         float64            `json:"discount"`
	Status           string             `json:"status"`
}
