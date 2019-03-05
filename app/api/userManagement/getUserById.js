import gql from 'graphql-tag';

export default id => {
  const getUserById = `getUserById(input: {id: "${id}"})`;
  return gql`
    query {
      ${getUserById} {
        id
        userId,
        password
        type
        status
        category
        address {
          street
          extraLine
          landmark
          city
          state
          country
          postalCode
        }
        contact {
          salutation
          firstName
          middleName
          lastName
          position
          organization
          email
          phones {
            type
            number
          }
        }
        roleGroups {
          index
          roleGroupId
        }
        roles {
          index
          roleId
        }
      }
    }
  `;
};
