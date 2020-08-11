import gql from "graphql-tag";

const ADD_GROUPS = gql`
mutation(
        $groupName                :                 String,
        $Responsable              :                 String,
        $Member                   :                 String,
        $libelle                  :                 Boolean,
        $letter                   :                 Boolean,
        $mail                     :                 Boolean,
    ){
        InsertOneGroups(
            NameGroups            :         $groupName,
            BorrowersId           :         $Responsable,
            MembersBrrowers       :         $Member,
            LibelleGroup          :         $libelle,
            LetterRappel          :         $letter,
            MailRappel            :         $mail,           
        )
    }
`;


module.exports = {
    ADD_GROUPS,
}