package utils

import "go.mongodb.org/mongo-driver/bson/primitive"

func MakeSliceOfIDs(list []interface{}) []primitive.ObjectID {
	var ObjectIDs []primitive.ObjectID
	if list != nil {
		for i := 0; i < len(list); i++ {

			_id, err := primitive.ObjectIDFromHex(list[i].(string))

			if err != nil {

			}
			ObjectIDs = append(ObjectIDs, _id)
		}
	}
	return RemoveDoubles(ObjectIDs)
}
