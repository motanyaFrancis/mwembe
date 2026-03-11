import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

// HTTP link (queries + mutations)
const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

// Only create WebSocket link in browser
const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
            createClient({
                url: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
            })
        )
        : null;

// Split traffic between HTTP and WebSocket
const link =
    typeof window !== "undefined" && wsLink
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
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;