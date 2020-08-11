import gql from "graphql-tag";

const GetSuggestions = gql`
  query($flag: String!) {
    getsuggestions(flag: $flag) {
      _id
      isbn
      title
      author
      quantity
      price
      datepublication
      comments
      source
    }
  }
`;

const GetSuggestionsReader = gql`
  query($source: String!) {
    getsuggestions(source: $source) {
      _id
      isbn
      title
      author
      quantity
      price
      datepublication
      comments
      source
    }
  }
`;

module.exports = {
  GetSuggestions,
  GetSuggestionsReader,
};
