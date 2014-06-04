'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('NotesController', ['$scope','$state', 'Store', function($scope, $state, Store) {
						
						$scope.noteActive = function(){
							return !$state.is('notes');								
						};
						
						$scope.store = new Store('notes/note/store',
										{
											excerpt:true,
											sort:'mtime',
											dir:'DESC'
										});
					}]).
				controller('NoteDetailController', ['Model','$scope', '$state', '$stateParams', function(Model,$scope, $state, $stateParams) {
												
						
						$scope.note = new Model('note', 'notes/note');
						
						$scope.note.load($stateParams.noteId);						

					}]).
				controller('NoteEditController', ['Model','$scope', '$state', '$stateParams', function(Model,$scope, $state, $stateParams) {
						
												
						
						$scope.note = new Model('note', 'notes/note');						
						
						$scope.note.afterSave = $scope.note.afterDelete = function(note, result){							
							$scope.store.reload();
							$state.go('notes.detail',{noteId:$scope.note.attributes.id});
						};
						
						$scope.note.load($stateParams.noteId);				
					}]).
								
				controller('CategoryController', ['Store','$scope', '$http', 'utils', function(Store,$scope,$http,utils) {
												
						
						$scope.store = new Store('notes/category/store');						
						
						$scope.saveCategory = function(category){
							
							$http.get(utils.url("notes/category/toggle", {id: category.id, enabled: category.checked ? 1 : 0}))
												.success(function(result) {													
												});
						};
						
					}]);



