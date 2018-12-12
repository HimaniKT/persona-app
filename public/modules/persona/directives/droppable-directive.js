'use strict';

angular.module('myApp.persona')
.directive('droppable', [ function(version) {
  return {
    scope: {someCtrlFn: '&callbackFn', column: '='},
    link: function(scope, element, attrs,controllers) {
    var el = element[0];
     el.addEventListener(
                'dragover',
                function(e) {
                    e.preventDefault(); // Allow the drop
                    // Set effects
                    e.dataTransfer.dropEffect = 'move';
                    return false;
                }, false
            );
    el.addEventListener(
               'drop',
               function(e) {
                  scope.$apply(function(){
                   scope.someCtrlFn(scope.column);
                   });
                   return false;
               }, false
           );
  }
  };
}]);