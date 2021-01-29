import {
  GraphQLObjectType
, GraphQLSchema
, GraphQLInt
} from 'graphql/lib/type'

let count = 0

const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name   : 'RootQueryType'
  , fields : {
      count : {
        type        : GraphQLInt
      , description : 'count'
      , resolve () {
          return count
        }
      }
    }
  })
, mutation : new GraphQLObjectType({
    name   : 'RootMutationType'
  , fields : {
      updateCount : {
        type        : GraphQLInt
      , description : 'count update'
      , resolve () {
          count += 1
          return count
        }
      }
    }
  })
})

export default schema

