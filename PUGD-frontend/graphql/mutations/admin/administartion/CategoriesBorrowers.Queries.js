import gql from "graphql-tag";

const INSERT_CATEGORIES_BORROWERS = gql`
 mutation(
  $name :               String,
  $age_min:             Int,
  $age_max:             Int,
  $duree_adhesion :     Int
){
  InsertOne_Categ_Borrower(
    name_categorie:     $name,
    age_min:            $age_min,
    age_max:            $age_max,
    duree_adhesion:     $duree_adhesion,
  )
}
`;


module.exports = {
    INSERT_CATEGORIES_BORROWERS,


}