import gql from 'graphql-tag';

const INSERT_BORROWERS = gql`
    mutation(
        $barcode :                      String,
        $first_name:                    String,
        $last_name:                     String,
        $profession:                    String,
        $birth_day:                     DateTime,
        $gender:                        String,
        $phone_number:                  String,
        $email:                         String,
        $ru1:                           String,
        $ru2:                           String,
        $city :                         String,
        $contry :                       String,
        $username_opac :                String,
        $password_opac :                String,
        $lang_opac :                    String,
        $message :                      String,
        $comment :                      String,
        $member_ship_start :            DateTime,
        $localisation :                 String,    
        $idCategoriesBorrowers :        String,
        $idStatusborrowes :             String,
        $groupsBorrowers :              [String],
        $static_code :                  String,

    ){
  InsertOneBorrower(
    first_name:             $first_name,
    last_name:              $last_name,
    profession:             $profession,
    bar_code:               $barcode,
    city:                   $city,
    ru1:                    $ru1,
    ru2:                    $ru2,
    contry:                 $contry,
    birth_day :             $birth_day,
    gender :                $gender,
    phone_number :          $phone_number,
    email :                 $email,
    username_opac :         $username_opac,
    password_opac :         $password_opac,
    lang_opac :             $lang_opac,
    message :               $message,
    comment :               $comment,
    member_ship_start :     $member_ship_start,
    localisation:           $localisation,   
    idCategoriesBorrowers:  $idCategoriesBorrowers,
    idStatusborrowes:       $idStatusborrowes,
    groupsBorrowers :       $groupsBorrowers,
    static_code:            $static_code,
  )
}
`;


const UPDATE_BRROWERS = gql`
    mutation(
        $FullName :                 String,
        $Address:                   String,
        $PhoneNumber:               String,
        $BirthDay:                  String,
        $Email:                     String,
        $Gender:                    String,
        $Statues:                   String,
        $OpacLogin:                 String,
        $MembershipStart:           String,
        $MembershipCanceled :       String,
        $Barcode :                  String,
    ){

        UpdateOneBrrower(
            FullName :          $FullName,
            Address :           $Address,
            PhoneNumber:        $PhoneNumber,
            BirthDay:           $BirthDay,
            Email:              $Email,
            Gender:             $Gender,
            Statues:            $Statues,
            OpacLogin:          $OpacLogin,
            MembershipStart:    $MembershipStart,
            MembershipCanceled: $MembershipCanceled,
            Barcode:            $Barcode,
        )
    }

`;

const DELETE_BORROWER = gql`
  mutation($_id: String!) {
    DeleteOneBorrower(_id: $_id)
  }
`;

module.exports = {
    INSERT_BORROWERS,
    UPDATE_BRROWERS,
    DELETE_BORROWER
}
