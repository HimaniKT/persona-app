/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

angular.module('myApp.persona').service('PersonaService', ['PersonaManipulator', '$http', '$q', 'baseUrl', function(PersonaManipulator, $http, $q, baseUrl) {

 return {
  personaBoard: function() {
    var deferred = $q.defer();
    $http.get(baseUrl + 'personas/personaId')
     .then(function(response) {
      var persona = response.data;
      $http.get(baseUrl + 'personas/personaId/columns')
       .then(function(response) {
        var columns = response.data;
        $http.get(baseUrl + 'personas/personaId/fields')
         .then(function(response) {
          var fields = response.data;
          var personaBoard = new Persona(persona.id, persona.name, persona.initials, persona.color, persona.avatar, columns.length); //id, name, initials, color, avatar,
           angular.forEach(columns, function(column) {
           PersonaManipulator.addColumn(personaBoard, column);
           var cardsInColumn = _.filter(fields, card => card.column_id == column.id);
           PersonaManipulator.sortFields(cardsInColumn); //Order fields by prev/next link
           angular.forEach(cardsInColumn, function(card) {
           PersonaManipulator.addCardToColumn(personaBoard, card.id, card.title, card.field_type, card.data, column.id, card.prev_id, card.next_id);
           });
          });
          deferred.resolve(personaBoard);
         });
       });

     });
    return deferred.promise;
   },
  updatePersona: function(board, modifiedValue) {
     board.initials = modifiedValue;
     if (modifiedValue) {
      var updatedPersona = angular.copy(board);
      delete updatedPersona.columns;
      console.log("POST CALL -> Update persona: ", updatedPersona);
     }
  },
  removeField: function(board, column, card) {
   PersonaManipulator.removeCardFromColumn(board, column, card);
   console.log("POST CALL -> Delete persona field: "+ card.id, card);
  },
  updateFieldPosition: function(personaBoard, card, column, dropIndex) {
   var oldCard = angular.copy(card);
   card.prev_id = dropIndex != 0 ? column.cards[dropIndex - 1].id : null;
   card.next_id = dropIndex != column.cards.length - 1 ? column.cards[dropIndex + 1].id : null;
   card.column_id = column.id;
   PersonaManipulator.updateFieldPosition(personaBoard, column, card, oldCard);
   console.log("POST CALL -> Update persona field: ", card);
  },
  addNewCard: function(personaBoard, col) {
   angular.forEach(personaBoard.columns, function(column) {
    if (col.id === column.id) {
     var prev_id = col.cards.length != 0 ? col.cards[col.cards.length - 1].id : null;
     var card = new Card(Math.random(), "SHORT TEXT", "short_text", "", column.id, prev_id, null);
     PersonaManipulator.addCardToColumn(personaBoard, card.id, card.title, card.field_type, card.data, column.id, card.prev_id, card.next_id);
     console.log("POST CALL -> Create persona field: ", card);
    }
   });

  },
  updatePersonaField: function(board, column, card) {
   console.log("POST CALL -> Update persona field: ", card);
  }
   };
}]);