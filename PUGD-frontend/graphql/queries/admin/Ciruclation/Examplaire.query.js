import gql from "graphql-tag";
//todo complet this
const EXAMPLAIR_BY_CODE = gql`
    query($code: String){
        copies(BareCode:$code){
            _id,
            BareCode,
            Record{
              Title,
              ISBN,
            },
        }
    }
`;



module.exports = {
    EXAMPLAIR_BY_CODE,
}
