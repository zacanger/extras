const postsModule = angular.module('ayuba.posts', [])

postsModule.service('Posts', $http => {
  return {
    all(){
      return $http.get('/api/posts').then(postList => {
        return postList.data
      })
    }
  , add(newPost){
      return $http({
        method : 'post'
      , url    : '/api/posts'
      , data   : newPost
      }).then(res => {
        return res.data
      }).catch(err => {
        console.error('sorry! something went wrong.')
        console.error(err)
        return err
      })
    }
  , remove(){}
  , update(){}
  }
})

