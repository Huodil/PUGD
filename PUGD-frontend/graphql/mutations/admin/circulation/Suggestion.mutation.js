import gql from "graphql-tag";

const ADD_SUGGESTION = gql`
mutation(
        $SuggestionBy               :                 String,
        $Ponderation                :                 Float,
        $Etat                       :                 Boolean,
        $Quantite                   :                 Int,
        $TitreOrDescriptionFile     :                 String,
        $Editeur                    :                 String,
        $Auteur                     :                 String,
        $ISBN                       :                 String,
        $Prix                       :                 Float,
        $URLAssocier                :                 String,
        $DateDePublication          :                 DateTime,
        $Commentaires               :                 String,
        $CommentairesGestion        :                 String,
        $PieceJointe                :                 String,
    ){
        InsertOneSuggestion(
            SuggestionBy            :         $SuggestionBy,
            Ponderation             :         $Ponderation,
            Etat                    :         $Etat,
            Quantite                :         $Quantite,
            TitreOrDescriptionFile  :         $TitreOrDescriptionFile,
            Editeur                 :         $Editeur,
            Auteur                  :         $Auteur,
            ISBN                    :         $ISBN,
            Prix                    :         $Prix,
            URLAssocier             :         $URLAssocier,                                                                                                                                                                             
            Commentaires            :         $Commentaires,
            CommentairesGestion     :         $CommentairesGestion,
            DateDePublication       :         $DateDePublication,
            PieceJointe             :         $PieceJointe,
                       
        )
    }
`;


module.exports = {
    ADD_SUGGESTION,
}