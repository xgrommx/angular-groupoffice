'use strict';

/* Controllers */

angular.module('GO.controllers')
				.controller('NotesController', ['$scope', '$stateParams','$state', '$http', 'utils', 'ngTableParams', function($scope, $stateParams, $state, $http, utils, ngTableParams) {

						$scope.hideTable = function(){
							var isActive = $state.is('notes');	
							return isActive;
						};
					
				
						$scope.tableParams = new ngTableParams({
							page: 1, // show first page
							count: 10 // count per page
						}, {
							total: 0, //data.length, // length of data
							getData: function($defer, params) {


								$http.get(utils.url("notes/note/store"), {
									params: {
										query: $scope.searchModel.query,
										limit: params.count(),
										start: (params.page() - 1) * params.count()
									}
								})
								.success(function(data) {
									// update table params
									params.total(data.total);
									// set new data
									$defer.resolve(data.results);
								});


							}
						});
						
						$scope.searchModel = {
							query:''
						};
						
						$scope.search = function($event){
							
							if($event.keyCode===13){
								$scope.tableParams.reload();
							}
						};



					}]).
				controller('NoteDetailController', ['crudFunctions','$scope', '$stateParams', '$http', '$state', 'utils', 'alert', function(crudFunctions,$scope, $stateParams, $http, $state, utils, alert) {
						
						
						crudFunctions($scope, 'note', 'notes/note');		
						
						$scope.noteId = $stateParams.noteId;
						$scope.load($scope.noteId);						

					}]);



