;(function () {
  var app = angular.module('githubViewer')

  var UserController = function ($scope, github, $routeParams) {
    var onUserComplete = function (data) {
      $scope.user = data
      github.getRepos($scope.user).then(onReposComplete, onError)
    }

    var onReposComplete = function (data) {
      $scope.repos = data
    }

    var onError = function (response) {
      $scope.error = 'Could not fetch data because "' + response.data.message + '"'
    }

    $scope.username = $routeParams.username
    $scope.repoSortOrder = '-stargazers_count'
    github.getUser($scope.username).then(onUserComplete, onError)
  }

  app.controller('UserController', ['$scope', 'github', '$routeParams', UserController])

}())

