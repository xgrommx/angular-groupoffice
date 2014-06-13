'use strict';

angular.module('GO.notes.controllers').

				controller('NoteDetailController', ['Model', '$scope', '$state', '$stateParams','loadNote', function(Model, $scope, $state, $stateParams,  loadNote) {
						$scope.note = new Model('note', 'notes/note');
						$scope.note.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('notes');
						};
						
						loadNote($scope, $stateParams.noteId);

					}]);



