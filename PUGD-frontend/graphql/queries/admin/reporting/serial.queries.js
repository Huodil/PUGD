import gql from 'graphql-tag';

const GET_ONE_SERIAL  = gql`
query(
    $Id : String,
){ GetOneSerial(Id:$Id)
  {
    Id           
	Status       
	SerialX      
	SerialY     
	SerialZ      
	ClaimCount   
	ClaimDate    
	RoutingNotes
  }
}
  
  `;
const GET_ALL_SERIAL  = gql`
  query(
      $Status : String,
      
  ){ GetAllSerials(Status:$Status)
    {
        Id           
	Status       
	SerialX      
	SerialY     
	SerialZ      
	ClaimCount   
	ClaimDate    
	RoutingNotes
    }
  
  }
    
    `;
module.exports={
    GET_ALL_SERIAL,
    GET_ONE_SERIAL,
}
