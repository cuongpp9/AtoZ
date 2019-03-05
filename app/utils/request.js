import client from 'config/ApolloClient';

export function queryRequest(query) {
  return client
    .query({
      query,
    })
    .then(data => {
      if (data.errors) {
        return Promise.reject(data.errors[0].message);
      }
      return Promise.resolve(data.data);
    })
    .catch(err => Promise.reject(err));
}

export function mutationRequest(mutation) {
  return client
    .mutate({
      mutation,
    })
    .then(data => {
      if (data.errors) {
        return Promise.reject(data.errors[0].message);
      }
      return Promise.resolve(data.data);
    })
    .catch(err => Promise.reject(err));
}
