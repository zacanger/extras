const adminApp = angular.module('ayuba.admin', [
  'ui.router'
, 'btford.markdown'
, 'ayuba.posts'
])

adminApp.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
  .state('allPosts', {
    url         : '/'
  , templateUrl : '/admin/templates/allPosts.html'
  , resolve     : {
      postList(Posts){
        return Posts.all().then(data => {
          return data
        })
      }
    }
  , controller  : 'AllPostsCtrl'
  })
  .state('addPost', {
    url         : '/addPost'
  , templateUrl : '/admin/templates/addPost.html'
  , controller  : 'AddPostCtrl'
  })

  $urlRouterProvider.otherwise('/')

})

