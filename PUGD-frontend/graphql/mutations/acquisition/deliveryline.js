import gql from "graphql-tag";
const InsertDeliveryLine = gql`
  mutation(
    $_id: String!
    $orderline: String!
    $isbn: String!
    $title: String
    $date: String
    $newquantity: Int
    $remainingquantity: Int
    $order: String!
  ) {
    insertDeliveryLine(
      _id: $_id
      order: $order
      orderline: $orderline
      isbn: $isbn
      title: $title
      date: $date
      newquantity: $newquantity
      remainingquantity: $remainingquantity
    )
  }
`;
module.exports = {
  InsertDeliveryLine,
};
