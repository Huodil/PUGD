import gql from 'graphql-tag';

const GET_COPY = gql`
query($Id : String!){
  copy(id:$Id){
    _id
    BareCode
    Price
    ReplacementPrice
    DateLastBorrowed
    DateLastSeen
    Stack
    NoteForLoan
    WithDrawn
    Reserves
    Restricted
    CopyNumber
    NewStatus
    Cote
    Localisation{
      _id
      Name
    }
    Status{
      _id
      status_name
    }
    MediaType{
      _id
    }
    Owner{
      _id
    }
    Section{
      _id
      section_name
    }
    CodeStatic{
      _id
    }
    Record{
      _id
      ISBN
      Title
      Type
      RecYear
      NbPages
      Publishers{
        _id
        name
      }
      Responsibility{
        Author{
          _id
          name_auth
        }
        Function{
          _id
          value
        }
        
      }
    }
  }
}
`;
const GET_COPY_ALL_FIELDS = gql`
 
query($BareCode : String){
  copies(BareCode:$BareCode){
    _id
    BareCode
    Price
    ReplacementPrice
    DateLastBorrowed
    DateLastSeen
    Stack
    NoteForLoan
    WithDrawn
    Reserves
    Restricted
    CopyNumber
    NewStatus
    Cote
    Localisation{
      _id
    }
    Status{
      _id
    }
    MediaType{
      _id
    }
    Owner{
      _id
    }
    Section{
      _id
    }
    Record{
      _id
      ISBN
      Title
    }
    CodeStatic{
      _id
    }
  }
}
`;


module.exports = {
  GET_COPY: GET_COPY,
  GET_COPY_ALL_FIELDS: GET_COPY_ALL_FIELDS, 

}