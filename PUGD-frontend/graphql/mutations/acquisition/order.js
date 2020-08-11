import gql from "graphql-tag";

const InsertOrder = gql`
  mutation(
    $id: String!
    $establishement: String!
    $name: String
    $quotation_number: String
    $order_number: String
    $financial_year: String!
    $date: String!
    $delivery_address: String!
    $billing_address: String!
    $notes: String!
    $status: String!
    $type: String!
    $provider: String!
    $order_lines: [String!]!
  ) {
    insertOrder(
      id: $id
      establishement: $establishement
      name: $name
      quotation_number: $quotation_number
      order_number: $order_number
      financial_year: $financial_year
      date: $date
      delivery_address: $delivery_address
      billing_address: $billing_address
      notes: $notes
      status: $status
      type: $type
      provider: $provider
      order_lines: $order_lines
    )
  }
`;

const UpdateOrder = gql`
  mutation(
    $_id: String!
    $establishement: String
    $name: String
    $quotation_number: String
    $order_number: String
    $financial_year: String
    $date: String
    $delivery_address: String
    $billing_address: String
    $notes: String
    $status: String
    $type: String
    $provider: String
    $order_lines: [String]
  ) {
    updateOrder(
      _id: $_id
      establishement: $establishement
      name: $name
      quotation_number: $quotation_number
      order_number: $order_number
      financial_year: $financial_year
      date: $date
      delivery_address: $delivery_address
      billing_address: $billing_address
      notes: $notes
      status: $status
      type: $type
      provider: $provider
      order_lines: $order_lines
    )
  }
`;

const DeleteOrder = gql`
  mutation($_id: String!) {
    deleteOrder(_id: $_id)
  }
`;

//important
module.exports = {
  InsertOrder,
  DeleteOrder,
  UpdateOrder,
};
