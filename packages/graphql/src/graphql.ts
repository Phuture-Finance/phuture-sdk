import { GraphQLClient } from 'graphql-request'

const client = (endpoint) =>  {
    new GraphQLClient(endpoint)
}