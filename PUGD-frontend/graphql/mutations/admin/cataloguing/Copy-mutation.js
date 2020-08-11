import gql from "graphql-tag";

const ADD_COPY = gql`
mutation(
        $BareCode :         String,
        $Price :            Float,
        $ReplacementPrice : Float,
        $DateLastBorrowed : String,
        $DateLastSeen :     String,
        $Stack :            String,
        $NoteForLoan :      Boolean,
        $WithDrawn :        Boolean,
        $Reserves :         Int,
        $Restricted :       String,
        $CopyNumber :       Int,
        $NewStatus :        String,
        $Cote :             String,
        $Localisation :     String,
        $Section :          String,
        $Owner :            String,
        $MediaType :        String,
        $Status :           String,
        $CodeStatic :       String,
        $Record :           String,
    ){
      insertOneCopy(
            BareCode :         $BareCode ,
            Price :            $Price,
            ReplacementPrice : $ReplacementPrice,
            DateLastBorrowed : $DateLastBorrowed,
            DateLastSeen :     $DateLastSeen,
            Stack :            $Stack,
            NoteForLoan :      $NoteForLoan,
            WithDrawn :        $WithDrawn,
            Reserves :         $Reserves,
            Restricted :       $Restricted,
            CopyNumber :       $CopyNumber ,
            NewStatus :        $NewStatus ,
            Cote :             $Cote,
            Localisation :     $Localisation,
            Section :          $Section,
            Owner :            $Owner,
            MediaType :        $MediaType,
            Status :           $Status,
            CodeStatic :       $CodeStatic,
            Record :           $Record ,
                       
        )
    }
`;

const UPDATE_COPY = gql`
mutation(
    $Id :            String!,
    $BareCode :         String,
    $Price :            Float,
    $ReplacementPrice : Float,
    $DateLastBorrowed : String,
    $DateLastSeen :     String,
    $Stack :            String,
    $NoteForLoan :      Boolean,
    $WithDrawn :        Boolean,
    $Reserves :         Int,
    $Restricted :       String,
    $CopyNumber :       Int,
    $NewStatus :        String,
    $Cote :             String,
    $Localisation :     String,
    $Section :          String,
    $Owner :            String,
    $MediaType :        String,
    $Status :           String,
    $CodeStatic :       String,
    $Record :           String,
  ){
    updateOneCopy(
    _id :               $Id,
    BareCode :         $BareCode ,
    Price :            $Price,
    ReplacementPrice : $ReplacementPrice,
    DateLastBorrowed : $DateLastBorrowed,
    DateLastSeen :     $DateLastSeen,
    Stack :            $Stack,
    NoteForLoan :      $NoteForLoan,
    WithDrawn :        $WithDrawn,
    Reserves :         $Reserves,
    Restricted :       $Restricted,
    CopyNumber :       $CopyNumber ,
    NewStatus :        $NewStatus ,
    Cote :             $Cote,
    Localisation :     $Localisation,
    Section :          $Section,
    Owner :            $Owner,
    MediaType :        $MediaType,
    Status :           $Status,
    CodeStatic :       $CodeStatic,
    Record :           $Record ,
  )
}
`;
const DELETE_COPY = gql`
mutation($Id:String!){
  deleteOneCopy(_id:$Id)
}
`;


module.exports = {
    ADD_COPY : ADD_COPY,
    UPDATE_COPY : UPDATE_COPY,
    DELETE_COPY : DELETE_COPY,
}