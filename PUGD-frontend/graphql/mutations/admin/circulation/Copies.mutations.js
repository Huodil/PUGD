
import gql from 'graphql-tag';

const  InsertCopy = gql`
  mutation(
    $NewStatus: String!
    $WithDrawn: Boolean!
    $BareCode: String!
    $DateLastBorrowed: String!
    $DateLastSeen: String!
    $Restricted: String!
    $Price: Float!
    $Stack: String!
    $CopyNumber: Int!
    $NoteForLoan: Boolean!
    $Record:String!
    $Reserves: Int!
    $ReplacementPrice: Float


  ) {
    insertOneCopy(
    NewStatus: $NewStatus
    WithDrawn :$WithDrawn
    BareCode: $BareCode
    DateLastBorrowed: $DateLastBorrowed
    DateLastSeen: $DateLastSeen
    Restricted: $Restricted
    Price: $Price
    Stack: $Stack
    CopyNumber:  $CopyNumber
    NoteForLoan: $NoteForLoan
    Record:$Record
    Reserves: $Reserves
    ReplacementPrice: $ReplacementPrice
    )
  }
`;

/*const UpdateCopy = gql`
  mutation ($_id: String!)(
    $NewStatus: String!
    $WithDrawn: Boolean!
    $BareCode: String!
    $DateLastBorrowed: String!
    $DateLastSeen: String!
    $Restricted: String!
    $Price: Float!
    $Stack: String!
    $CopyNumber: Int!
    $NoteForLoan: Boolean!
    $Record:String!
    $Reserves: Int!
    $ReplacementPrice: Float


  ) {
    updateOneCopy (_id: $_id)(
    NewStatus: $NewStatus
    WithDrawn :$WithDrawn
    BareCode: $BareCode
    DateLastBorrowed: $DateLastBorrowed
    DateLastSeen: $DateLastSeen
    Restricted: $Restricted
    Price: $Price
    Stack: $Stack
    CopyNumber:  $CopyNumber
    NoteForLoan: $NoteForLoan
    Record:$Record
    Reserves: $Reserves
    ReplacementPrice: $ReplacementPrice
    )
  }
`;*/
const DELETE_COPY = gql`
  mutation($_id: String!) {
    deleteOneCopy(_id: $_id)
  }
`;


//important
module.exports = {
    InsertCopy,
    DELETE_COPY
};

