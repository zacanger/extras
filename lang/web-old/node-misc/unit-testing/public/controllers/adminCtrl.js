angular.module('ecommerce')
.controller('adminCtrl', function($scope, productsService, $state) {
  $scope.showNewProduct = false

  $scope.newProduct = function(product) {
    productsService.newProduct(product)
    $scope.showNewProduct = false
    $scope.product = {}
  }

  $scope.editProducts = function() {
    productsService.getProducts().then(function(data) {
      $scope.products = data
    })
    $scope.editMode = true
    $state.go('admin.edit')
  }

  $scope.updateProduct = function(product) {
    productsService.updateProduct(product).then(function(response) {
      $state.editProductForm = false
      console.log(response)
      $state.go('admin.edit', {}, {reload : true})
    })
  }

  $scope.deleteProduct = function(productId) {
    productsService.deleteProduct(productId).then(function(response) {
      $scope.editMode = false
      $state.go('admin', {}, {reload : true})
    })
  }

  $scope.cancelForm = function() {
    $scope.editMode = false
    $state.go('admin', {}, {reload : true})
  }
})

