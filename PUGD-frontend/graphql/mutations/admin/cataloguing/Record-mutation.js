import gql from 'graphql-tag';

const INSERT_RECORD = gql`
    mutation(
        $isbn :             String,
        $title:             String,
        $OtherTitle:        String,
        $ParallelTitle:     String,
        $RecYear:           Int,
        $Price:             Int,
        $Type:              String,
        $EditionStatement:  String,
        $OtherInformations: String,
        $Format:            String,
        $Summary:           String,
        $NoteOnContents:    String,
        $ItemStatus:        String,
        $IsNew :            Boolean,
        $IsNum :            Boolean,
        $AccMaterial :      String,
        $NoteAuthor :       String,
        $NbPages :          Int,
        $FkSeries :         String,
        $FkSubSeries :      String,
        $Language :         [String],
        $OriginalLanguage : [String],
        $KeyWords :         [String],
        $Branches :         [String],
        $Publisher :        String,
        $OtherPublisher:    String,
        $CollectionTitle :  [String],
        $ClassNumber:       [String],
        $Responsibility :   [String],
        $Category :         [String],
       
    ){
        insertOneRecord(
            isbn :              $isbn,
            title:              $title,
            OtherTitle :        $OtherTitle,
            ParallelTitle :     $ParallelTitle,
            RecYear:            $RecYear,
            EditionStatement :  $EditionStatement,
            OtherInformations : $OtherInformations,
            Format :            $Format,
            Price:              $Price,
            Type:               $Type,
            Summary :           $Summary,
            NoteOnContents :    $NoteOnContents,
            ItemStatus :        $ItemStatus,
            IsNew :             $IsNew,
            IsNum :             $IsNum,
            AccMaterial :       $AccMaterial,
            NoteAuthor :        $NoteAuthor,
            NbPages :           $NbPages,
            FkSeries :          $FkSeries,
            FkSubSeries :       $FkSubSeries,
            Language :          $Language,
            OriginalLanguage :  $OriginalLanguage,
            KeyWords :          $KeyWords,
            Branches :          $Branches, 
            Publisher :         $Publisher,
            OtherPublisher :    $OtherPublisher,
            CollectionTitle :   $CollectionTitle, 
            ClassNumber :       $ClassNumber,
            Responsibility :    $Responsibility
            Category :         $Category
        )
    }
`;


const UPDATE_RECORD = gql`
    mutation(
        $Id : String!,
        $isbn : String,
        $title: String,
        $OtherTitle:        String,
        $ParallelTitle:     String,
        $RecYear:           Int,
        $Price:             Float,
        $Type:              String,
        $EditionStatement:  String,
        $OtherInformations: String,
        $Format:            String,
        $Summary:           String,
        $NoteOnContents:    String,
        $ItemStatus:        String,
        $IsNew :            Boolean,
        $IsNum :            Boolean,
        $AccMaterial :      String,
        $NoteAuthor :       String,
        $NbPages :          Int,
        $FkSeries :         String,
        $FkSubSeries :      String,
        $Language :         [String],
        $OriginalLanguage : [String],
        $KeyWords :         [String],
        $Branches :         [String],
        $Publishers :       String,
        $OtherPublishers:   String,
        $CollectionTitle :  [String],
        $Category :         [String],
        $ClassNumber:       [String],
        $Responsibility : [String]
    ){
        updateOneRecord(
            _id :               $Id
            isbn :              $isbn,
            title:              $title,
            OtherTitle :        $OtherTitle,
            ParallelTitle :     $ParallelTitle,
            RecYear:            $RecYear,
            Price:              $Price,
            Type:               $Type,
            EditionStatement :  $EditionStatement,
            OtherInformations : $OtherInformations,
            Format :            $Format,
            Summary :           $Summary,
            NoteOnContents :    $NoteOnContents,
            ItemStatus :        $ItemStatus,
            IsNew :             $IsNew,
            IsNum :             $IsNum,
            AccMaterial :       $AccMaterial,
            NoteAuthor :        $NoteAuthor,
            NbPages :           $NbPages,
            FkSeries :          $FkSeries,
            FkSubSeries :       $FkSubSeries,
            Language :          $Language,
            OriginalLanguage :  $OriginalLanguage,
            KeyWords :          $KeyWords,
            Branches :          $Branches,
            Publisher :         $Publishers,
            OtherPublisher :    $OtherPublishers
            CollectionTitle :   $CollectionTitle, 
            Category :          $Category, 
            ClassNumber :       $ClassNumber,
            Responsibility : $Responsibility
        )
    }
`;

const DELETE_RECORD = gql`
mutation($Id:String!){
    deleteOneRecord(_id:$Id)
}
`;

module.exports = {
    INSERT_RECORD: INSERT_RECORD,
    UPDATE_RECORD: UPDATE_RECORD,
    DELETE_RECORD: DELETE_RECORD,
}