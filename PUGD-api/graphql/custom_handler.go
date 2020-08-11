package graphql

import (
	"encoding/json"
	"fmt"
	"github.com/Harmony-Technology/PUGD-api/utils"
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
	"github.com/graphql-go/graphql/language/parser"
	"github.com/graphql-go/graphql/language/source"
	"github.com/graphql-go/handler"
	"net/http"
)

func MyContextHandler(c *gin.Context, w http.ResponseWriter, r *http.Request, h *handler.Handler) {
	// get query
	opts := handler.NewRequestOptions(r)
	// execute graphql query
	params := graphql.Params{
		Schema:         *h.Schema,
		RequestString:  opts.Query,
		VariableValues: opts.Variables,
		OperationName:  opts.OperationName,
	}
	source := source.NewSource(&source.Source{
		Body: []byte(params.RequestString),
		Name: "GraphQL request",
	})
	// parse the source
	AST, err := parser.Parse(parser.ParseParams{Source: source})
	if err != nil || AST == nil|| AST.Definitions == nil{
		c.AbortWithStatus(400)
		return
	}
	currentQuery := ((AST.Definitions[0]).(*ast.OperationDefinition).SelectionSet.Selections[0]).(*ast.Field).Name.Value
	if currentQuery != "register" && currentQuery != "login" {
		jwt, authorizationErr := utils.Authorize(c)
		if authorizationErr != nil {
			c.AbortWithStatusJSON(401, gin.H{
				"message": "Unauthorized",
			})
			return
		}
		fmt.Println("current use id is ", jwt.Id)
	}
	result := graphql.Do(params)
	// use proper JSON Header
	js, err := json.Marshal(result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}


func MyCustomGraphQLHandlerfunc(rw http.ResponseWriter, r *http.Request,schema *graphql.Schema) {

	// parse http.Request into handler.RequestOptions
	opts := handler.NewRequestOptions(r)

	// inject context objects http.ResponseWrite and *http.Request into rootValue
	// there is an alternative example of using `net/context` to store context instead of using rootValue
	rootValue := map[string]interface{}{
		"response": rw,
		"request":  r,
		"viewer":   "john_doe",
	}

	// execute graphql query
	// here, we passed in Query, Variables and OperationName extracted from http.Request
	params := graphql.Params{
		Schema:         *schema,
		RequestString:  opts.Query,
		VariableValues: opts.Variables,
		OperationName:  opts.OperationName,
		RootObject:     rootValue,
	}
	result := graphql.Do(params)

	// one way to render JSON without use of external libraries
	// alternatively, you can use libraries like `unrolled/render`
	js, err := json.Marshal(result)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}
	rw.Header().Set("Content-Type", "application/json")
	rw.Write(js)
}