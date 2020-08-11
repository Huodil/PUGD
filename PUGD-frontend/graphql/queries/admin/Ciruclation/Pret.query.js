
import gql from 'graphql-tag';
const GetOneCopyByCode = gql`
   
     query ($code_bar: Int!){
     GetExamplaireByCodeBar(code_bar:$code_bar){
  _id
  BareCode
  CopyNumber
  Localisation
  NoteForLoan
  Price
  Record{
    Category
    Format
    ISBN
    _id
    Title
    Summary
    RecYear
    Publishers
    ParallelTitle
    OtherInformations
    OriginalLanguage
    NoteAuthor
    IsNum
    Baskets
    AccMaterial
    AuthorityLink
    FkSeries
    CollectionTitle
  }
  ReplacementPrice
  Reserves
  Restricted
  Stack
  WithDrawn
}
    }
`;
const GetAllPrets = gql`
    query{
  GetAllPret{
     Copy{
            ISBN
            Title
            Format
            NbPages
        }
        Prolongement{
            DateProlongement
            NombreMax
        }
        DatePret
        DateRetour
    }
  }
`;

const Get_Pret_Of_Borrower = gql`
query ($idBorrower: String!){
    GetPretOfBorrower(idBorrower:$idBorrower) {
        Total

    }

}
`;
module.exports = {
    GetAllPrets,
    Get_Pret_Of_Borrower
}


