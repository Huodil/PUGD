import gql from "graphql-tag";

const InsertSuggestion = gql`
  mutation(
    $isbn: String
    $title: String
    $author: String
    $quantity: Int
    $price: Float
    $datepublication: String
    $source: String
    $comments: String
    $flag: String
  ) {
    insertsuggestion(
      isbn: $isbn
      title: $title
      author: $author
      quantity: $quantity
      price: $price
      datepublication: $datepublication
      source: $source
      comments: $comments
      flag: $flag
    )
  }
`;

const UpdateSuggestion = gql`
  mutation(
    $_id: String!
    $isbn: String
    $title: String
    $author: String
    $quantity: Int
    $price: Float
    $datepublication: String
    $source: String
    $comments: String
    $flag: String
  ) {
    updatesuggestion(
      _id: $_id
      isbn: $isbn
      title: $title
      author: $author
      quantity: $quantity
      price: $price
      datepublication: $datepublication
      source: $source
      comments: $comments
      flag: $flag
    )
  }
`;

const DeleteSuggestion = gql`
  mutation($_id: String!) {
    deletesuggestion(_id: $_id)
  }
`;

//important
module.exports = {
  InsertSuggestion,
  UpdateSuggestion,
  DeleteSuggestion,
};
