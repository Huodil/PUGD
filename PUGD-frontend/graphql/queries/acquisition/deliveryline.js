import gql from "graphql-tag";

const GetDeliveryLine = gql`
  query {
    getAllDeliveryLines {
      _id
      isbn
      orderline
      order
      title
      newquantity
      remainingquantity
      date
    }
  }
`;

module.exports = {
  GetDeliveryLine,
};
