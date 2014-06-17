'use strict';

angular.module('GO.notes.controllers')

				.controller('NotesController', ['$scope', '$state', 'translate', 'store','model', function($scope, $state, translate, store, model) {

						$scope.pageTitle = translate.t('Notes');
						

						$scope.contentActive = function() {
							return !$state.is('notes');
						};

						$scope.store = new store('notes/note/store',
										{
											limit: 10,
											excerpt: true,
											sort: 'mtime',
											dir: 'DESC'
										});
										
										
										
						//Will be used in child scope. We define it here so we can access 
						//the properties if needed in the future.
						//Child scopes automatically inherit properties of the parents but
						//not the other way around.
						$scope.note = new model('note', 'notes/note');
						
						$scope.note.afterSave = function(note, result) {
							$scope.store.reload();
							$state.go('notes.detail', {noteId: $scope.note.attributes.id});
						};
						
						$scope.note.afterDelete = function(note, result) {
							$scope.store.remove($scope.store.findIndexByAttribute("id", $scope.note.attributes.id));
							$state.go('notes');
						};
						
						
					}]);



