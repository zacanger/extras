;(function () {
  var app = angular.module('githubViewer')

  var RepoController = function ($scope, github, $routeParams) {
    var onRepoComplete = function (data) {
      $scope.repo = data
      github.getContributors($scope.repo).then(onContributorsComplete, onError)
    }

    var onContributorsComplete = function (data) {
      $scope.contributors = data
    }

    var onError = function (response) {
      $scope.error = 'Could not fetch data because "' + response.data.message + '"'
    }

    $scope.username = $routeParams.username
    $scope.reponame = $routeParams.reponame

    github.getRepo($scope.username, $scope.reponame).then(onRepoComplete, onError)
  }

  app.controller('RepoController', ['$scope', 'github', '$routeParams', RepoController])

}())

