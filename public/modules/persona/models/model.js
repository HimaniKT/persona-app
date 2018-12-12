/*jshint undef: false, unused: false, indent: 2*/
/*global angular: false */

'use strict';

function Persona(id, name, initials, color, avatar, numberOfColumns) {
 return {
  id: id,
  name: name,
  initials: initials,
  color: color,
  avatar: avatar,
  numberOfColumns: numberOfColumns,
  columns: []
 };
}

function Column(id, width) {
 return {
  id: id,
  width: width,
  cards: []
 };
}

function Card(id, title, field_type, details, column_id, prev_id, next_id) {
 return {
  id: id,
  title: title,
  field_type: field_type,
  details: details,
  column_id: column_id,
  prev_id: prev_id,
  next_id: next_id
 };
}