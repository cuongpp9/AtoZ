import gql from 'graphql-tag';

export default ({ type }) => {
  const getCollectionScheduleByType = `getCollectionScheduleByType(input: {type:${type}})`;
  return gql`
    query {
      ${getCollectionScheduleByType} {
        id
        type
        collectionSchedule {
          index
          offsetdays
          description
          action
        }
      }
    }
  `;
};
