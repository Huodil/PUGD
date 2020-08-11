package AcquisitionModels

import "go.mongodb.org/mongo-driver/bson/primitive"

type Delivery_line struct {
	ID                primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Order_Line        primitive.ObjectID `json:"orderline"`
	Order             primitive.ObjectID `json:"order"`
	Isbn              string             `json:"isbn"`
	Title             string             `json:"title"`
	NewQuantity       int                `json:"newquantity"`
	RemainingQuantity int                `json:"remainingquantity"`
	Date              string             `json:"date"`
}
