'use strict'

angular.module('vimark')

  .controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
    $scope.mesg = 'Hello'
    var firebaseObj = new Firebase('https://dm7.firebaseio.com/')
    var auth = $firebaseAuth(firebaseObj)

    var login = {}
    $scope.login = login

    $scope.signUp = function () {
      if (!$scope.regForm.$invalid) {
        var email = $scope.user.email
        var password = $scope.user.password
        if (email && password) {
          login.loading = true
          auth.$createUser(email, password)
            .then(function () {
              $location.path('/home')
            }, function (error) {
              $scope.regError = true
              $scope.regErrorMessage = error.message
            })
        }
      }
    }
  }])
