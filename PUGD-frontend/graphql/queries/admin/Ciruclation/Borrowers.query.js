import gql from 'graphql-tag';

const ALL_BORROWERS = gql`
    query($filter: String!){
     getAllBorrowers(filter:$filter){
          _id
          first_name,
          last_name,
          bar_code
          birthday,
          email,
          gender,
            
          
        }
    }
`;
const GetBorrower = gql`
    query ($id: String!){
     getOneBorrower(id:$id){
         _id,
         bar_code,
         first_name,
         last_name,
         email,
         phone_number,
         birthday,
         gender,
         statues,
         username_opac,
         password_opac,
         lang_opac,
         membershipstart,
         membershipcanceled,
         address{
            rue1,
            rue2,
            city,
            contry,
         }, 
         __typename,
      }
    }
`;
const AllBorrowers = gql`
    query($full_name: String){
       getAllBorrowers(filter: $full_name){
             _id
            first_name,
            last_name,
            bar_code
            email,
       }
    }
`;

const BORROWER_WITH_PRET_AND_RSV = gql`
    query($id: String!){
       GetBorrowerWithPretAndReservation(id: $id){
           Borrower{
               _id,
               first_name,
               last_name,
               bar_code
               birthday,
               phone_number,
               email,
               gender,
               profession,
               comment,
               message,
               username_opac,
               password_opac,
               lang_opac,
               address{
                  city,
                  contry,
                  rue1,
                  rue2,
               },
               localisation{
                  Name,
                  __typename,
               },
               static_code{
                  static_name,
                  __typename
               },
               categories{
                  name,
                  __typename
               }
              
           },
           All_Reservation{
              date_init,
              
              copy{
                _id
                BareCode
                Record{
                    Title
                }
              },
              rank,
           },
           All_Pret{
              date_init,
              date_retour,
              date_prolongement,
              copy{
                  _id,
                  BareCode,
                  Cote,
                  Record{
                   Title
                  },
                  Localisation{
                    Name
                  },
                  Section{
                    section_name
                  },
                  MediaType{
                     media_types_name
                  },
              },
           }
            __typename,
       }
    }
`;

module.exports = {
    ALL_BORROWERS,
    AllBorrowers,
    GetBorrower,
    BORROWER_WITH_PRET_AND_RSV,
};
