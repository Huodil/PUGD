import gql from 'graphql-tag';

const INSERT_BASKET = gql`
mutation(
 $Basket:BasketInputType
){
  InsertBasket(
  basket:$Basket
  )
}
`;

const UPDATE_BASKET = gql`
mutation(
  $Id: String!
  $BasketName: String,
  $BasketNote: String,
  $BasketType : String,
  $BasketColor : String,
  $BasketElements : [String], ){
  UpdateBasket(
    Id : $Id,
    BasketName:$BasketName,
    BasketNote:$BasketNote,
    BasketType:$BasketType,
    BasketColor:$BasketColor,
    BasketElements:$BasketElements,
  )
}
`;

const ADD_TO_BASKET = gql`
mutation(
  $BasketId : ID! ,
  $ElementId :ID!,
  $ElementType : String! ,
){
AddToBasket(
  BasketId:$BasketId,
  ElementId:$ElementId,
  ElementType:$ElementType
)
}
`;


const REMOVE_FROM_BASKET = gql`
mutation(
  $BasketId:ID!,
  $ElementId : ID!,
){
  
  RemoveFromBasket(
    BasketId:$BasketId,
   ElementId:$ElementId)
}
`;
const TAG_ELEMENT_IN_BASKET = gql`
mutation(
  $BasketId : ID! ,
  $ElementId :ID!,
  $Tag : Boolean! ,
){
  TagElementInBasket(
    BasketId:$BasketId,
    ElementId:$ElementId,
    tag:$Tag
  )
}
`;

module.exports = {
  INSERT_BASKET,
  UPDATE_BASKET,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  TAG_ELEMENT_IN_BASKET
}
