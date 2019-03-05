import gql from 'graphql-tag';

export default id => gql`
  query {
    getDependencyById(input: { id: "${id}" }) {
      id
      bundleId,
      packageId
      startDate
      endDate
      dependencyLists {
        index
        bundleId
        packageId
        type
      }
    }
  }
`;
