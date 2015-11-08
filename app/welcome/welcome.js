'use strict';

angular.module('myApp.welcome', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
    $scope.username = CommonProp.getUser();
    if(!$scope.username){
        $location.path('/home');
    }

    var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/");


    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

    $scope.articles = sync.$asArray();

    $scope.logout = function(){
    CommonProp.logoutUser();
}


    $scope.editPost = function(id) {
        var firebaseObj = new Firebase("https://dm7.firebaseio.com/posts/" + id);


        var syn = $firebase(firebaseObj);
        $scope.postToUpdate = syn.$asObject();

        $('#editModal').modal();
    }

    $scope.update = function() {
        console.log($scope.postToUpdate.$id);
        var fb = new Firebase("https://dm7.firebaseio.com/posts/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
            $('#editModal').modal('hide')
        }, function(error) {
        });

    }


    $scope.confirmDelete = function(id) {
        var fb = new Firebase("https://dm7.firebaseio.com/posts/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        var fb = new Firebase("https://dm7.firebaseio.com/posts/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
        });
    }




}]);
