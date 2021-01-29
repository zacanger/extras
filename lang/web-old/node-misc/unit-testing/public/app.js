angular.module('ecommerce', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider
  .state('home', {
    url         : '/'
  , templateUrl : './views/home.html'
  , controller  : 'mainCtrl'
  })
  .state('products', {
    url         : '/products'
  , templateUrl : './views/products.html'
  , controller  : 'productsCtrl'
  , resolve : {
      products : function(productsService) {
        return productsService.getProducts()
      }
    }
  })
  .state('admin', {
    url         : '/admin'
  , templateUrl : './views/admin.html'
  , controller  : 'adminCtrl'
  })
  .state('admin.edit', {
    templateUrl : './views/adminEdit.html'
  })
})

