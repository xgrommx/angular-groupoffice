'use strict';

angular.module('GO.notes.controllers').

				controller('NoteEditController', ['Model', '$scope', '$state', '$stateParams','loadNote', function(Model, $scope, $state, $stateParams, loadNote) {


						$scope.note = new Model('note', 'notes/note');
						$scope.note.afterSave = function(note, result) {
							$scope.store.reload();
							$state.go('notes.detail', {noteId: $scope.note.attributes.id});
						};
						
						loadNote($scope, $stateParams.noteId);

						$scope.cancel = function() {
							if ($scope.note.attributes.id) {
								$state.go('notes.detail', {noteId: $scope.note.attributes.id});
							} else
							{
								$state.go('^');
							}
						};
					}]);



