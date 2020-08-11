import gql from 'graphql-tag';

const GetRecordYear= gql`
query(
  $RecYear : int,
  $Author :String,
){GetRecordYear(RecYear:$RecYear,Author:$Author)
  {
    _id
    Title
    ISBN
    OtherTitle
    ParallelTitle
    RecYear
    EditionStatement
    OtherInformations
    Format
    Summary
    IsNew
    IsNum
    AccMaterial
    NoteAuthor
    NbPages
    FkSeries
    FkSubSeries
    Baskets
    KeyWords
    Category
    Branches         
    Copies            
	Serials          
	Responsibilities
 
  }

}
  
  `;
const getRecord = gql`
query(
  $RecYear : Int,
  $Author :String,
  $Original_language :String,
  $Category :String,
  $NbPage : Int,
  $Redactor : String,
$ContentType : String,

){
  GetRecord (RecYear:$RecYear,Author:$Author,Original_language:$Original_language,Category:$Category,NbPage:$NbPage,Redactor:$Redactor,ContentType:$ContentType)
  {
    _id
    Title
    ISBN
    OtherTitle
    ParallelTitle
    RecYear
    EditionStatement
    OtherInformations
    Format
    Summary
    IsNew
    IsNum
    AccMaterial
    NoteAuthor
    NbPages
    FkSeries
    FkSubSeries
    Baskets
    KeyWords
    Category
    Branches         
    Copies            
	  Serials          
  	
    Redactor
  
  }
} 
`;
module.exports = {
  GetRecordYear,
  getRecord,
}