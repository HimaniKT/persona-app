/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */


'use strict';

angular.module('myApp.persona').factory('PersonaManipulator', function() {
 return {

  addColumn: function(board, column) {
   board.columns.push(new Column(column.id, column.width));
  },

  addCardToColumn: function(board, id, cardTitle, field_type, details, column_id, prev_id, next_id) {
   angular.forEach(board.columns, function(col) {
    if (col.id === column_id) {
     //update last field
     if (col.cards.length != 0) {
      col.cards[col.cards.length - 1].next_id = id;
     }
     //create new card
     col.cards.push(new Card(id, cardTitle.toUpperCase(), field_type, details, column_id, prev_id, next_id));
     //  console.log(col.cards);
    }

   });
  },
  removeCardFromColumn: function(board, column, card) {
   angular.forEach(board.columns, function(col) {
    if (col.id === column.id) {
     //update linked fields
     if (card.prev_id)
      col.cards.find(c => c.id == card.prev_id).next_id = card.next_id;

     if (card.next_id)
      col.cards.find(c => c.id == card.next_id).prev_id = card.prev_id;

     //remove card from column
     col.cards.splice(col.cards.indexOf(card), 1);
    }

   });
 //  console.log(board.columns);
  },
  updateFieldPosition(board, column, card, cardOld) {
   angular.forEach(board.columns, function(col) {
    if (col.id === cardOld.column_id) {

     if (cardOld.prev_id)
      col.cards.find(c => c.id == cardOld.prev_id).next_id = cardOld.next_id;

     if (cardOld.next_id)
      col.cards.find(c => c.id == cardOld.next_id).prev_id = cardOld.prev_id;
    }
    //update linked fields
    if (col.id === column.id) {
     if (card.prev_id)
      col.cards[col.cards.indexOf(card) - 1].next_id = card.id;

     if (card.next_id)
      col.cards[col.cards.indexOf(card) + 1].prev_id = card.id;
    }

   });
   //console.log(board.columns);
  },
  sortFields: function(cards) {
   if (cards.length == 0) return cards;
   var sortedArray = [];
   var i = 0;
   var current = cards.find(c => typeof c.prev_id == "object");
   sortedArray.push(current);
   current = cards.find(c => c.id == current.next_id);
   i++;

   while (current.next_id) {
    sortedArray[i] = current;
    current = cards.find(c => c.id == current.next_id);
    i++;
   }
   sortedArray.push(current);
   return sortedArray;
  }
 };
});