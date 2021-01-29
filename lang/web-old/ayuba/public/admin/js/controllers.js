adminApp

.controller('NavCtrl', ($scope, $state) => {
  $scope.active   = $state
  $scope.isActive = viewLocation => {
    const active = (viewLocation === $state.current.name)
    return active
  }
})

.controller('AllPostsCtrl', ($scope, postList) => {
  $scope.posts      = postList
  $scope.activePost = false
  $scope.setActive  = post => {
    $scope.activePost = post
  }
})

.controller('AddPostCtrl', ($scope, $state, Posts) => {
  $scope.post    = {}
  $scope.addPost = newPost => {
    Posts.add(newPost).then(res => {
      console.log(res)
    })
    $state.go('allPosts')
  }
})

