import gql from "graphql-tag";

const EXAMPLAIR_BY_CODE = gql`
    query($isbn: String!){
        GetExamplaireByCodeBar(ISBN:$isbn){
            _id,
            ISBN,
          Title,
          OtherTitle
        }
    }
`;

module.exports = {
    EXAMPLAIR_BY_CODE,
}
