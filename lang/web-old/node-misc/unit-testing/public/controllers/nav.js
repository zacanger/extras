angular.module('ecommerce')
.controller('nav', function($scope, $state) {
  $scope.isActive = function(state) {
    return $state.is(state)
  }
})

