'use strict';

angular.module('GO.notes.controllers').

				controller('NoteDetailController', ['model', '$scope', '$state', '$stateParams','loadNote', function(model, $scope, $state, $stateParams,  loadNote) {
						$scope.note = new model('note', 'notes/note');
						$scope.note.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('notes');
						};
						
						loadNote($scope, $stateParams.noteId);

					}]);



