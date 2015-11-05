 'use strict';
angular.module('rtfm', ['ui.router', 'firebase'])
  .service(fb){
      var firebaseRef = new Firebase("https://dazzling-torch-2219.firebaseio.com/");
    this.getThreads = function(){
      return new Firebase(fb.url + '/threads')
    };
    this.getThread = function(threadId){
      return new Firebase(fb.url + '/threads' + 'threadId')
    };
    this.getComments = function(threadId){
      return new Firebase(fb.url + '/threads' + threadId + '/comments');
    };
}
