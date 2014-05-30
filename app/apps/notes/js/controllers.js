'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('NotesController', ['$scope','$state', 'listFunctions', function($scope, $state, listFunctions) {

						$scope.hideTable = function(){
							var isActive = $state.is('notes');	
							return isActive;
						};
						
						
						listFunctions(
										$scope, 
										'notes/note/store',
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
							console.log(category);
							
							$http.post(utils.url("notes/category/enable"), {enabled: category.checked})
												.success(function(result) {													
												});
						};
						
					}]);



