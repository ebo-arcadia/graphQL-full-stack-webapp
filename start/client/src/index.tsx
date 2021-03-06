import { ApolloClient, gql, NormalizedCacheObject, ApolloProvider, useQuery} from "@apollo/client";
import { cache } from './cache';
import React from 'react';
import ReactDOM from "react-dom";
import Pages from './pages';
import injectStyles from './styles';
import Login from "./pages/login";

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

function IsLoggedIn() {
    const {data} = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Pages /> : <Login />;
}

export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!
        cartItems: [ID!]!
    }
`;

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache, uri: 'http://localhost:4000/graphql',
    headers: { authorization: localStorage.getItem(('token')) || ''},
    typeDefs
});

// ...ApolloClient instantiated here...

injectStyles();

// Pass the ApolloClient instance to the ApolloProvider component

ReactDOM.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
)

// the following script is used to test query using vanilla javascript

// client.query({
//     query: gql`
//         query TestQuery {
//             launch(id: 56) {
//                 id
//                 mission {
//                     name
//                 }
//             }
//         }
//     `
// })
// .then(result => console.log(result));