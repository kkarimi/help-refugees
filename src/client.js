import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NODE_ENV === 'development'
      ? 'http://localhost:8081/graphql'
      : 'https://stone-nucleus-173311.appspot.com/graphql'
  }),
  cache: new InMemoryCache()
})

export default client
