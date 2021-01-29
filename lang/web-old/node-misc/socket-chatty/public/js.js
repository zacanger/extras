angular.module('chatroom', [])
  .controller('chatroomCtrl', ['$scope', '$timeout', function($scope, $timeout){
    var socket = io()
      , chatDiv

    $scope.step = 1
    $scope.message = {'all': {}, 'new': ''}
    $scope.name = ''

    socket.on('get-all-messages', function(data){
      $scope.message.all = data
      $scope.$apply()
    })

    socket.on('message-update', function(data){
      $scope.message.all.push(data)
      $scope.$apply()
    })

    $scope.sendMessage = function(message){
      if (message) {
        socket.emit('new-message', {'user': $scope.name,'message': message})
        $scope.message.all.push({'user': $scope.name,'message': message})
        $scope.message.new = ''
      }
    }

    $scope.nextStep = function(name){
      $scope.step++
      $scope.name = name
      scrollBottom()
    }

    $scope.$watchCollection('message.all', function(){
      if ($scope.step === 2) {
        scrollBottom()
      }
    })

    var scrollBottom = function(){
      $timeout(function(){
        chatDiv = document.getElementById('chat')
        chatDiv.scrollTop = chatDiv.scrollHeight
      }, 0)
    }
  }])

