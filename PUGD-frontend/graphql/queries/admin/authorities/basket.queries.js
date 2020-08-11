import gql from 'graphql-tag';

const GET_BASKET = gql`
query ($Basket: BasketInputType) {
  basket(basket: $Basket) {
    _id
    basket_name
    basket_color
    basket_note
    basket_type
    basket_elements {
      element_type
      tag
      element {
        ... on AuthorType {
          _id
          name: name_auth
        }
        ... on CategoryType {
          _id
          name
        }
        ... on PublisherType {
          _id
          name
        }
        ... on ClassNumberType {
          _id
          name
        }
        ... on SubSeriesType {
          _id
          name
        }
        ... on SeriesType {
          _id
          name:title
        }
        ... on UniformTitleTypeAuthorities {
          _id
          name
        }
        ... on CollectionTitle {
          _id
          name:title
        }
      }
    }
  }
}

`;

module.exports = {
  GET_BASKET,

}
