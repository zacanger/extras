import { combineReducers } from 'redux'
import {
  select-subreddit
, invalidate-subreddit
, receive-posts
, request-posts
} from './actions'

const postsState = {
  isFetching    : false
, didInvalidate : false
, items         : []
}

const selectedSubreddit = (state = 'reactjs', action) => {
  switch (action.type) {
    case select-subreddit:
      return action.subreddit
    default:
      return state
  }
}

const posts = (state = postsState, action) => {
  switch (action.type) {
    case invalidate-subreddit:
      return Object.assign({}, state, {
        didInvalidate : true
      })
    case request-posts:
      return Object.assign({}, state, {
        isFetching    : true
      , didInvalidate : false
      })
    case receive-posts:
      return Object.assign({}, state, {
        isFetching    : false
      , didInvalidate : false
      , items         : action.posts
      , lastUpdated   : action.receivedAt
      })
    default:
      return state
  }
}

const postsBySubreddit = (state = {}, action) => {
  switch (action.type) {
    case invalidate-subreddit:
    case receive-posts:
    case request-posts:
      return Object.assign({}, state, {
        [action.subreddit] : posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit
, selectedSubreddit
})

export default rootReducer
