package models

import (
	"context"
	"github.com/Harmony-Technology/PUGD-api/models/db"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	DB *mongo.Database
)

func NewDB() *mongo.Database {
	const oldb = "mongodb://localhost:27017/"

	ctx := context.Background()
	client, err := mongo.Connect(
		ctx,

		options.Client().ApplyURI(os.Getenv(db.DB_Remote)),
	)
	if err != nil {
		log.Fatal(err)
	}
	return client.Database(os.Getenv(db.DbName))
}