package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

// RemoveDoubles removes the duplicated elements of a slice of ObjectIDs
func RemoveDoubles(IdSlice []primitive.ObjectID) []primitive.ObjectID {
	keys := make(map[primitive.ObjectID]bool)
	list := []primitive.ObjectID{}
	for _, entry := range IdSlice {
		if _, value := keys[entry]; !value {
			keys[entry] = true
			list = append(list, entry)
		}
	}
	return list
}
