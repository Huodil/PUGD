import gql from 'graphql-tag';

const GET_Reservation = gql`
  query{ GetAllReservations
	{
		Borrower{
                  first_name
     last_name
     bar_code
 
     phonenumber
     birthday
     email
     gender
   
     username_opac
     password_opac
     lang_opac
 
     membershipstart
 
     membershipcanceled
 
     message
 
     comment
     categories{
     namecategoriesbrrowers
      dureeadhesion
     agemin
     agemax
 
     }
		

        }

		
	
		Record{
            _id
            ISBN

		Title
        OtherTitle
        ParallelTitle
        RecYear
        EditionStatement
        OtherInformations
        Format
        Summary

        }   
       
        confirmed
        dateres
        Rank
  }
}

	
      `;
      const GET_ReservationTrait = gql`
      query{GetReservationstrait
          {
                Borrower{
             first_name
     last_name
     bar_code
 
     phonenumber
     birthday
     email
     gender
   
     username_opac
     password_opac
     lang_opac
 
     membershipstart
 
     membershipcanceled
 
     message
 
     comment
     categories{
     namecategoriesbrrowers
      dureeadhesion
     agemin
     agemax
 
     }
                
    
            }
    
             
                Record{
                _id
                ISBN
    
                Title
            OtherTitle
            ParallelTitle
            RecYear
            EditionStatement
            OtherInformations
            Format
            Summary
    
            
          }
      confirmed
            dateres
            Rank
      }
    }
    
          
          `;
module.exports={
	GET_Reservation,
	GET_ReservationTrait,
}
