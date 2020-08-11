import gql from "graphql-tag";

const InsertFacture = gql`
  mutation(
    $id: String!
    $numFacture: String!
    $provider: String!
    $order: String!
    $status: String!
    $payementDate: String!
    $total_ttc: Float!
    $currency: String!
    $date: String!
    $establishement: String!
    $quantitiesFactured: [Float!]!
    $order_lines: [String!]!
  ) {
    insertFacture(
      id: $id
      provider: $provider
      order: $order
      status: $status
      establishement: $establishement
      numFacture: $numFacture
      payementDate: $payementDate
      total_ttc: $total_ttc
      currency: $currency
      date: $date
      order_lines: $order_lines
      quantitiesFactured: $quantitiesFactured
    )
  }
`;

const DeleteFacture = gql`
  mutation($_id: String!) {
    deleteFacture(_id: $_id)
  }
`;
module.exports = {
  InsertFacture,
  DeleteFacture,
};
