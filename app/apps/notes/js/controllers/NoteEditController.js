'use strict';

angular.module('GO.notes.controllers').

				controller('NoteEditController', ['model', '$scope', '$state', '$stateParams','loadNote', function(model, $scope, $state, $stateParams, loadNote) {


						
						
						
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



