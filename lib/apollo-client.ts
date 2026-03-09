import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP Link for queries & mutations
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

// WebSocket Link for subscriptions
const wsLink = process.browser
    ? new GraphQLWsLink(
        createClient({
            url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!, // e.g., wss://api.themwembe.ke/graphql
        })
    )
    : null;

// Split link based on operation type
const splitLink = process.browser && wsLink
    ? split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink,
        httpLink
    )
    : httpLink;

// Apollo Client
export const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});