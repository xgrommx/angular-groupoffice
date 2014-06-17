'use strict';

angular.module('GO.notes.controllers').

				controller('NoteDetailController', ['model', '$scope', '$state', '$stateParams','loadNote', function(model, $scope, $state, $stateParams,  loadNote) {
						
						//Model is defined in the parent scope of NotesController
//						$scope.note = new model('note', 'notes/note');
						
						loadNote($scope, $stateParams.noteId);

					}]);



