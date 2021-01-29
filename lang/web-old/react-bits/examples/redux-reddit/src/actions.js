import fetch from 'isomorphic-fetch'

export const request-posts = 'request_posts'
export const receive-posts = 'receive_posts'
export const select-subreddit = 'select_subreddit'
export const invalidate-subreddit = 'invalidate_subreddit'

export const selectSubreddit = subreddit => ({
  type : select-subreddit
, subreddit
})

export const invalidateSubreddit = subreddit => ({
  type : invalidate-subreddit
, subreddit
})

const requestPosts = subreddit => ({
  type : request-posts
, subreddit
})

const receivePosts = (subreddit, json) => ({
  type       : receive-posts
, subreddit
, posts      : json.data.children.map(child => child.data)
, receivedAt : Date.now()
})

const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`http://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
