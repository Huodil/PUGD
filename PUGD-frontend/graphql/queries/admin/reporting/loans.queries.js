import gql from 'graphql-tag';

  const GET_LOANS  = gql`
  query{ GetLoans
    {
      
      confirmed
      DatePret
      DateInitial
      DateRetour

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
  
      Copy{
              _id
      BareCode
          Price
          ReplacementPrice
          DateLastBorrowed
          DateLastSeen
          Stack
          NoteForLoan
    
      WithDrawn
      Reserves
      Restricted
  
      CopyNumber
      NewStatus
     
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
    }
      
         
    }
  }
    
    `;
  const GET_Delay  = gql`
  query{ GetDelay
    {
      
      confirmed
      DatePret
      DateInitial
      DateRetour
      Retour
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
  
      Copy{
              _id
      BareCode
          Price
          ReplacementPrice
          DateLastBorrowed
          DateLastSeen
          Stack
          NoteForLoan
    
      WithDrawn
      Reserves
      Restricted
  
      CopyNumber
      NewStatus
     
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
    }
      
         
    }
  }
    
    `;
  const GET_delays_By_Categories= gql`
  query(
    $CategoriesBorrower : String,
){ Getdelaybyborrower(CategoriesBorrower:$CategoriesBorrower)
  {
  
    confirmed
      DatePret
      DateInitial
      DateRetour

      Borrower {
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
  
      Copy{
              _id
      BareCode
          Price
          ReplacementPrice
          DateLastBorrowed
          DateLastSeen
          Stack
          NoteForLoan
    
      WithDrawn
      Reserves
      Restricted
  
      CopyNumber
      NewStatus
     
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
    }
     
    }
}
	`;
module.exports={
    GET_LOANS,
  GET_delays_By_Categories,
  GET_Delay,
}
