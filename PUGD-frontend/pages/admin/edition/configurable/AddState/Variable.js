import React from 'react'
import Checkbox from '../../../../../components/ui/Checkbox';
import { MixedCheckbox, useMixedCheckbox } from "@reach/checkbox";
const Variable = ({props}) => {
	
  
    var data=Array()
   const dataCopy=[        
	"code bare",       
	"Price",           
	"ReplacementPrice", 
	"DateLastBorrowed",
	"DateLastSeen",     
	"Stack"  ,         
	"NoteForLoan"  ,   
	"WithDrawn",        
	     
	"Restricted" ,      
	"CopyNumber",       
	"NewStatus" ,       
	"Localisation"  ,  
	"MediaType" ,      
	"Owner" ,          
	"Section" ,         
	"Status" ,          
	"Record",           
    ]
    const dataRecord=[           
	"ISBN" ,             
	"Title" ,            
	"OtherTitle" ,      
	"ParallelTitle",    
	"RecYear"   ,        
	"EditionStatement",
	"OtherInformations", 
	"Format" ,           
	"Summary"  ,         
	"IsNew" ,            
	"IsNum"  ,          
	"AccMaterial"  ,     
	"NbPages"  ,         
	"ContentType" ,  
	"Redactor" ,  
	"FkSeries"  ,        
	"FkSubSeries"  ,     
	"Baskets"    ,       
	"Language"  ,        
	"OriginalLanguage",  
	"KeyWords" ,         
	"Category" , "Serials"  , "Publishers"  ,  "AuthorityLink",    "CollectionTitle" ];
    if (props=="exemplaire"){
		data=dataCopy
  
    }
    if (props =="Notice"){
        data=dataRecord
           }
    
    
    return (
		<div>
		{data.map((item) =>
		<li>
    <Checkbox checked={false} label={item.toString()} />
	</li>
   
		)  }
		
		
		</div>
  )
    
}
export default Variable 