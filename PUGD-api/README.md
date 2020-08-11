This is the set up of PUGD-api
I assume everyone has Go installed in his machine as well as Mongodb.

- Create database `use books`
- Create books collection `db.createCollection('books')`
- Insert Same fake data like:

```SHELL
db.books.insert({
    "title": "Is this the real life ?",
    "isbn":  "theSuperISBN"
})

Run go project in port 9000 with go build main.go.
- Visit [this super link](http://localhost:9000/graphql)

Start writing your queries. ####Example
### Get one book by id
query {
  book(id: "5e505edac337193de43fd7b6") {
    _id
    title
    isbn
  }
} 

### Get a list of books with the option of filtering
### Params are optional
query {
  books(title : "title"){
    _id
    title
    isbn
  }
} 
 

### Adding a book

mutation{
 insertOneBook(isbn:"13424F344" title:"good success")
}
### Deleting a book

mutation{
  deleteOneBook(_id:"5e55a240e23a0533abdcd5c4")
}
### Updating a book

mutation{
 updateOneBook(_id:"5e53909f1c9d440000bf366d" isbn:"324FFRF" title:"Is this the real life ")
}