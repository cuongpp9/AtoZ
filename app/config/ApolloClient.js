import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

let uri;

// if (process.env.NODE_ENV === 'production') {
//   uri =
//     'http://congero-core-dev.us-east-2.elasticbeanstalk.com/congeroql/graphql';
// } else {
//   uri =
//     'http://congero-core-mock.us-east-2.elasticbeanstalk.com/congeroql/graphql';
// }

// const client = new ApolloClient({
//   link: new HttpLink({
//     uri,
//   }),
//   cache: new InMemoryCache({
//     addTypename: false,
//   }),
//   defaultOptions,
// });

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      'http://congero-core-dev.us-east-2.elasticbeanstalk.com/congeroql/graphql',
  }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions,
});

export default client;
