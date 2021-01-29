angular.module('app', ['ui-ace'])
.controller('ctrl', ['$scope', function($scope){
	ace.require('ace/ext/language_tools')
	$scope.code = 'howdy!'
}])
