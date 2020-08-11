import React, { useState } from "react";
import Checkbox from '../../../../../components/ui/Checkbox';
import TextBox from '../../../../../components/ui/TextBox'
const Filtre = ({props}) => {
	var [Checkbox, setChekbox] = useState(false) 
  
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
		{data.map((item,key) =>
		<li>
	<Checkbox key={item.toString()}  label={item.toString()} value={Checkbox}
                                        onChange={event => { setChekbox(event.target.value) }}>
									 {Checkbox == false ? (
                    null
                  ) : (
					<TextBox lable="test"/>
                   ) }
         
    

</Checkbox>












										
	</li>
		)  }
		
		
		</div>
  )
    
}
export default Filtre