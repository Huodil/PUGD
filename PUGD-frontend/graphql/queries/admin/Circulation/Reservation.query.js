import gql from 'graphql-tag';

const GET_ALL_RESERVATIONS = gql`
    query{
        GetAllReservation{
            borrwore{
              _id,
              first_name
              last_name,
              localisation{
                Name
              },
            },
            copy{
              Record{
                Title
              }
            }
            date_reservation,
            rank,       
        }
      
    }
`;

const GET_RESERVATIONS_BY_NAME = gql`
    query($Name_CatBr : String){
        GetAllCategBorrowers(Name_CatBr:$Name_CatBr){
            _id
            namecategoriesbrrowers
        }
    }
`;

const FIND_RESERVATION_COPY = gql`
    query($code: String){
        ValidateReservation(code_bar:$code){
           copy{
              _id
              BareCode,
              Cote,
              Record{
                Title,
                RecYear,
              },
              MediaType{
                 media_types_name,
              },
              Localisation{
                Name,
              },
              Section{
                section_name,
              },
              Status{
                status_name,
              },
              Owner{
                owner_name
              }
           },
           _id
           confirmed,
           isChecked
           rank
           borrower{
             _id
             first_name,
             last_name,
             bar_code,
           },
           lastLoan{
             _id
             first_name,
             last_name,
             bar_code,
           }
           __typename 
        }
    }
`;
module.exports = {
    GET_ALL_RESERVATIONS,
    GET_RESERVATIONS_BY_NAME,
    FIND_RESERVATION_COPY,
}