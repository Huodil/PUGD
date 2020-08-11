package models

import (
	"context"
	"errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"time"
)

type User struct {
	Id       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username"`
	Password string             `json:"password"`
}

func HashPassword(pwd []byte) (string, error) {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		return "", errors.New("can't hash password")
	}

	return string(hash), nil
}

func (u User) Find() *User {

	filter := bson.M{
		"username": u.Username,
	}

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var user User
	err := DB.Collection("user").FindOne(ctx, filter).Decode(&user)
	if err != nil {
		return nil
	}

	return &user
}

func (u *User) Store() (*primitive.ObjectID, error) {

	if u.Username == "" {
		return nil, errors.New("please provider a valid username")
	}

	hashedPassword, err := HashPassword([]byte(u.Password))
	if err != nil {
		return nil, errors.New(err.Error())
	}
	u.Password = hashedPassword

	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	coll := DB.Collection("user")
	result, errStoring := coll.InsertOne(ctx, u)
	if errStoring != nil {
		return nil, errors.New(errStoring.Error())
	}
	lastId := result.InsertedID.(primitive.ObjectID)
	return &lastId, nil
}
