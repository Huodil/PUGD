import gql from "graphql-tag";

const ADD_SERIAL = gql`
mutation(
          $ISSN :              String,
          $TitleProper:        String,
          $OtherTitleInfo:     String,
          $ParallelTitle:      String,
          $RecYear:            Int,
          $Type:               String,
          $Summary:            String,
          $VisibleInSerial :   Boolean,
          $ViewSerialCheckIn : Boolean,
          $NoteOnContents :    String,
          $GenetalNote :       String,
          $Language :          [String],
          $OriginalLanguage :  [String],
          $KeyWords :          [String],
          $Branches :          [String],
          $Publishers :        String,
          $OtherPublishers:    String,
          $Category :          [String],
          $ClassNumber:        [String],
          $Responsibility :   [String],

    ){
      insertOneSerial(
        ISSN :              $ISSN,
        TitleProper:        $TitleProper,
        OtherTitleInfo:     $OtherTitleInfo,
        ParallelTitle:      $ParallelTitle,
        RecYear:            $RecYear,
        Type:               $Type,
        Summary:            $Summary,
        VisibleInSerial :   $VisibleInSerial,
        ViewSerialCheckIn : $ViewSerialCheckIn,
        NoteOnContents :    $NoteOnContents,
        GenetalNote :       $GenetalNote,
        Language :          $Language,
        OriginalLanguage :  $OriginalLanguage,
        KeyWords :          $KeyWords,
        Branches :          $Branches,
        Publishers :        $Publishers,
        OtherPublishers:    $OtherPublishers,
        Category :          $Category,
        ClassNumber:        $ClassNumber, 
        Responsibility :    $Responsibility         
        )
    }
`;

const UPDATE_SERIAL = gql`
mutation(
    $Id :           String!,
    $ISSN :             String,
    $TitleProper:             String,
    $OtherTitleInfo:        String,
    $ParallelTitle:     String,
    $RecYear:           Int,
    $Type:              String,
    $Summary:           String,
    $VisibleInSerial :  Boolean,
    $ViewSerialCheckIn :  Boolean,
    $NoteOnContents :      String,
    $GenetalNote :       String,
    $Language :         [String],
    $OriginalLanguage : [String],
    $KeyWords :         [String],
    $Branches :         [String],
    $Publishers :       String,
    $OtherPublishers:   String,
    $Category :         [String],
    $ClassNumber:       [String],
    $Responsibility :   [String],
  ){
    updateOneSerial(
    _id   :         $Id,
    ISSN :             $ISSN,
    TitleProper:             $TitleProper,
    OtherTitleInfo:        $OtherTitleInfo,
    ParallelTitle:     $ParallelTitle,
    RecYear:           $RecYear,
    Type:              $Type,
    Summary:           $Summary,
    VisibleInSerial :            $VisibleInSerial,
    ViewSerialCheckIn :            $ViewSerialCheckIn,
    NoteOnContents :      $NoteOnContents,
    GenetalNote :       $GenetalNote,
    Language :         $Language,
    OriginalLanguage : $OriginalLanguage,
    KeyWords :         $KeyWords,
    Branches :         $Branches,
    Publishers :       $Publishers,
    OtherPublishers:   $OtherPublishers,
    Category :         $Category,
    ClassNumber:       $ClassNumber,
    Responsibility :    $Responsibility   
  )
}
`;

const DELETE_SERIAL = gql`
mutation($Id:String!){
  deleteOneSerial(_id:$Id)
}
`;


module.exports = {
    ADD_SERIAL: ADD_SERIAL,
    UPDATE_SERIAL : UPDATE_SERIAL,
    DELETE_SERIAL : DELETE_SERIAL,
}