import { ApolloClient, gql, HttpLink, InMemoryCache, split, ApolloLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
const httpLink = new HttpLink({
    uri: "http://localhost:4000/",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000`,
    options: {
        reconnect: true
    },
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export default new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    isLogin: {
                        read: (_, { variables }) => {
                            return localStorage.getItem("token") !== null ? true : false;
                        }
                    },
                    me: {
                        merge(existing, incoming) {
                            return { ...incoming };
                            // this part of code is depends what you actually need to do, in my
                        }
                    }
                }
            }
        }
    }),
    resolvers: {
        Mutation: {
            logUserIn: (a, { token }, { cache }) => {
                localStorage.setItem("token", token);

                cache.writeQuery({
                    query: gql`
                        {
                            isLogin @client
                        }
                    `,
                    data: {
                        isLogin: true
                    }
                });
                window.location = "/";
            },
            logUserOut: (a, { token }, { cache }) => {
                localStorage.removeItem("token");

                cache.writeQuery({
                    query: gql`
                        {
                            isLogin @client
                        }
                    `,
                    data: {
                        isLogin: false
                    }
                });
                window.location = "/";
            }
        }
    },
    link: ApolloLink.from([
        split(
            ({ query }) => {
                const definition = getMainDefinition(query);
                return definition.kind === "OperationDefinition" && definition.operation === "subscription";
            },
            wsLink,
            httpLink
        )
    ]),
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});
