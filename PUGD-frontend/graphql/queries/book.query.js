import gql from 'graphql-tag';

const BOOKS_QUERY = gql`
query{
  books{
    _id
    isbn
    title
  }}
  
  
`;
const BOOK_QUERY = gql`
query($id : String!){
  book(id:$id )
  {
    isbn
    title
  }
  }
`;

module.exports = {
  BOOKS_QUERY,
  BOOK_QUERY,

}
// export default BOOK_QUERY;
