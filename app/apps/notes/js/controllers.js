'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('NotesController', ['$scope','$state', 'RemoteList', function($scope, $state, RemoteList) {

						$scope.hideTable = function(){
							var isActive = $state.is('notes');	
							return isActive;
						};
						
						$scope.remoteList = new RemoteList('notes/note/store',
										{
											excerpt:true,
											sort:'mtime',
											dir:'DESC'
										});
						


					}]).
				controller('NoteDetailController', ['crudFunctions','$scope', '$stateParams', function(crudFunctions,$scope, $stateParams) {
												
						crudFunctions($scope, 'note', 'notes/note');		
						
						$scope.noteId = $stateParams.noteId;
						$scope.load($scope.noteId);						

					}]).
								
				controller('CategoryController', ['listFunctions','$scope', '$http', 'utils', function(listFunctions,$scope,$http,utils) {
												
						listFunctions($scope, 'notes/category/store');
						
						$scope.saveCategory = function(category){
							
							$http.get(utils.url("notes/category/toggle", {id: category.id, enabled: category.checked ? 1 : 0}))
												.success(function(result) {													
												});
						};
						
					}]);



