import gql from "graphql-tag";

const GetFactures = gql`
  query($provider: String, $status: String) {
    getFactures(status: $status, provider: $provider) {
      _id
      establishement
      numFacture
      provider
      order
      status
      payementDate
      total_ttc
      currency
      date
      quantitiesFactured
    }
  }
`;

module.exports = {
  GetFactures,
};
