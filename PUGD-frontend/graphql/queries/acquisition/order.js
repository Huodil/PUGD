import gql from "graphql-tag";

const GetOrders = gql`
  query($type: String!) {
    getOrders(type: $type) {
      _id
      status
      establishement
      date
      provider
      delivery_address
      billing_address
      order_lines
    }
  }
`;

const GetOrder = gql`
  query($id: String!) {
    getOrder(id: $id) {
      status
      establishement
      financial_year
      quotation_number
      order_number
      notes
      date
      provider
      type
      delivery_address
      billing_address
      order_lines
      name
    }
  }
`;

module.exports = {
  GetOrder,
  GetOrders,
};
