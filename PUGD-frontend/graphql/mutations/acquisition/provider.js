import gql from 'graphql-tag';

const InsertProvider = gql`
  mutation(
    $establishement: String!
    $name: String!
    $account: String!
    $adress: String!
    $phone: String!
    $email: String!
    $website: String!
  ) {
    insertProvider(
      establishement: $establishement
      name: $name
      account: $account
      adress: $adress
      phone: $phone
      email: $email
      website: $website
    )
  }
`;

const UpdateProvider = gql`
  mutation(
    $_id: String!
    $establishement: String!
    $name: String!
    $account: String!
    $adress: String!
    $phone: String!
    $email: String!
    $website: String!
  ) {
    updateProvider(
      _id: $_id
      establishement: $establishement
      name: $name
      account: $account
      adress: $adress
      phone: $phone
      email: $email
      website: $website
    )
  }
`;

const DeleteProvider = gql`
  mutation($_id: String!) {
    deleteProvider(_id: $_id)
  }
`;

//important
module.exports = {
  InsertProvider,
  DeleteProvider,
  UpdateProvider
};
