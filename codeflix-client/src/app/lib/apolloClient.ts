import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const APOLLO_SERVER_URL = process.env.APOLLO_SERVER_URL || 'http://localhost:4000';

const createApolloClient = () => {
    return new ApolloClient({
        link: new HttpLink({ uri: APOLLO_SERVER_URL }),
        cache: new InMemoryCache(),
    });
};

export const apolloClient = createApolloClient();