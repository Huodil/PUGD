import gql from 'graphql-tag';

const GetOneCopy = gql`
   query($id: String!){
copy(id:$id){
_id
BareCode
  Owner{
    owner_name
  }
  CopyNumber
  Localisation{
    Address
    Name
  }
  
  MediaType{
    media_types_name
  }
  Section{
    section_name
  }
  Record{
    ISBN
    Title
    OtherTitle
    NbPages
    
  }
  DateLastSeen
  DateLastBorrowed
  
}
}
`;
const GET_COPIES = gql`
query($code_bar : String){
    copies(BareCode : $code_bar){
      _id,
    BareCode,
    Price,
    Record{
      Title,
      ISBN,
      RecYear,
      Publishers{
        name
      },
      OriginalLanguage{
        Value,
      },
      FkSeries{
        title,
        issn,
        publisher{
          name
        }
      }
    },
    MediaType{
      media_types_name
    },
    Status{
      status_name,
    }
    Localisation{
      Name
    }
    Owner{
      owner_name
    }
    Section{
      section_name
    }
    __typename
  }
}
`;
const GetAllCopies = gql`
    query{
    copies{
  _id
  BareCode
  CopyNumber
  Localisation
  NoteForLoan
  Price
  Record{
    Category
    Format
    ISBN
    _id
    Title
    Summary
    RecYear
    Publishers
    ParallelTitle
    OtherInformations
    OriginalLanguage
    NoteAuthor
    IsNum
    Baskets
    AccMaterial
    AuthorityLink
    FkSeries
    CollectionTitle
  }
  ReplacementPrice
  Reserves
  Restricted
  Stack
  WithDrawn
}
    }
`;
const RETURN_COPY_FROM_PRET = gql`
    query($code: String){
        ReturnCopy(code_bar:$code){
            copy{
              _id
              BareCode,
              Cote,
              Record{
                Title,
                RecYear
              },
              MediaType{
              media_types_name,
              },
              Localisation{
                Name,
              },
              Section{
                section_name,
              },
              Status{
                status_name,
              },
              Owner{
                owner_name
              }
            },
            isLoan,
            lastLoan{
                _id,
                first_name,
                last_name,
                bar_code,
            },
            nextLoan{
                _id,
                first_name,
                last_name,
                bar_code,
            }
            
            __typename
        }
    }
`;
module.exports = {
    GetAllCopies,
    GetOneCopy,
    GET_COPIES,
    RETURN_COPY_FROM_PRET
}
