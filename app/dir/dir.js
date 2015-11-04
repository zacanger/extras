angular.module('directives').directive('dir ', function(){
return {
    templateUrl: '/app/dir/dir.html',
scope: {
    user: '=',
    setUser: '&'
},
link: function(scope, elem, attrs) {
    elem.on('click'function() {
        scope.show = !scope.show;
        scope.setUser({
            user: scope.user
        });
        $scppe.apply();
    })
}
}})
