'use strict';

angular.module('myApp.persona', ['ngRoute', 'ui.sortable'])

 .config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/persona', {
   templateUrl: '../modules/persona/views/persona.html',
   controller: 'PersonaCtrl'
  });
 }])
 .controller('PersonaCtrl', ['$scope', 'PersonaService', function($scope, PersonaService) {
  $scope.init = function() {
  PersonaService.personaBoard().then(function(response) {
    $scope.personaBoard = response;
  });
  //sorting & drag&drop config
  $scope.dragControlListeners = {
    containment: '.column-container',
    connectWith: '.fields-container',
    handle: '.field-card-handle',
    stop: function(e, ui) {
     try {
      var dropField = ui.item.sortable.model;
      var dropTargetColumn = ui.item.sortable.droptarget.scope().column;
      var dropIndex = ui.item.sortable.dropindex;
      PersonaService.updateFieldPosition($scope.personaBoard, dropField, dropTargetColumn, dropIndex); //update field position
     } catch (error) {
      console.log("Error updating drop position" + error.message);
     }
    }
   };
  }

  $scope.updatePersonaNameInitials = function(edit,newVal){
   if(edit == 'name')
   PersonaService.updatePersona($scope.personaBoard, $scope.personaBoard.name.substring(0, 3).toUpperCase());
   if(edit == 'initials')
   PersonaService.updatePersona($scope.personaBoard, $scope.personaBoard.initials);
  };

  $scope.removeField = function(column, card) {
   PersonaService.removeField($scope.personaBoard, column, card);
  };

  $scope.addNewCard = function(column) {
  if(!column){
   //find shortest column
   var columnList = $scope.personaBoard.columns;
   column = _.find(columnList, function(item) {
    if (item.cards.length == Math.min(columnList[0].cards.length, columnList[1].cards.length)) {
     return item;
    }
   });
   }
   PersonaService.addNewCard($scope.personaBoard, column);
  };

  $scope.updatePersonaField = function(column, card) {
  PersonaService.updatePersonaField($scope.personaBoard, column, card);
  };

  $scope.init();
 }]);