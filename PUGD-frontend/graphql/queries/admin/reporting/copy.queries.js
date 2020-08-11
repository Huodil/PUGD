import gql from 'graphql-tag';

const GET_COPY_STATUS  = gql`
query(
    $Status : String,
){ GetCopyStatus(Status:$Status)
  {
    _id
    BareCode
    Price
	id_Record        
	ReplacementPrice 
	DateLastBorrowed 
	DateLastSeen    
	Stack            
	NoteForLoan     
	WithDrawn        
	Reserves         
	Restricted       
	CopyNumber       
	Status           
	NewStatus        
	Reservation     
	Loans        
  }
}
  
  `;
const GET_COPY  = gql`
  query(
      $Title : String,
    $RecYear : int,
    $Author : String,
    $Original_language : String,
    $Category : String,
    $Publisher : String,
    $NbPage : String,
        
    
    
  ){ GetCopy(RecYear:$RecYear,Author:$Author,title:$title,Original_language:$Original_language,Category:$Category,Publisher:$Publisher,NbPage:$NbPage)
    {
      _id
      BareCode
      Price
      id_Record        
      ReplacementPrice 
      DateLastBorrowed 
      DateLastSeen    
      Stack            
      NoteForLoan     
      WithDrawn        
      Reserves         
      Restricted       
      CopyNumber       
      Status           
      NewStatus        
      Reservation     
      Loans        
    }
  
  }
    `;
module.exports = {
    GET_COPY,
    GET_COPY_STATUS,

}
