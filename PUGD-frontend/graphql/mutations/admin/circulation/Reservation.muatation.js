import gql from 'graphql-tag';

const INSERT_RESERVATION = gql`
    mutation(
        $copy_code  :               String!,
        $borrower   :               String!,
    ){
    InsertReservation(
        code_bar_copy   :        $copy_code,
        id_borrower     :        $borrower,
    )
    }
`;

const UPDATE_RESERVATION = gql`
    mutation(
         $_id :                 String!,
    ){
        UpdateReservation(
             _id  :          $_id,
        )
    }

`;


const DELETE_PRET = gql`
  mutation($_id: String!) {
     DeleteOnePret(_id: $_id)
  }
`;

module.exports = {
    INSERT_RESERVATION,
    UPDATE_RESERVATION,
}
