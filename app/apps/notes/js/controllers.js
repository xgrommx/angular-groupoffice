'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('NotesController', ['$scope', '$state', 'Store', function($scope, $state, Store) {

						$scope.pageTitle = 'Notes';

						$scope.noteActive = function() {
							return !$state.is('notes');
						};

						$scope.store = new Store('notes/note/store',
										{
											limit: 10,
											excerpt: true,
											sort: 'mtime',
											dir: 'DESC'
										});
					}]).
				controller('NoteDetailController', ['Model', '$scope', '$state', '$stateParams', function(Model, $scope, $state, $stateParams) {
						$scope.note = new Model('note', 'notes/note');
						$scope.note.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('notes');
						};
						
						
						
						
						
						$scope.loadNote = function(id, params){
							
							params = params || {};
							
							var promise = $scope.note.load(id, params);
							
							promise.then(function(result){
								if(result.data.data && result.data.data.note.attributes.encrypted){
									bootbox.prompt("Enter password to decrypt", function(password) {
										if (password === null) {
											bootbox.alert('Access denied');
											$state.go('notes');
										} else {
											var nextPromise = $scope.loadNote(id, {password: password});
											
											nextPromise.then(function(result){
												if(!result.data.success){
													bootbox.alert(result.data.feedback, function(){
														$scope.loadNote(id);
													});
												}
											});
										}
									});														

								}
							});
							
							return promise;
						};
						

						
						$scope.loadNote($stateParams.noteId);
						
						

					}]).
				controller('NoteEditController', ['Model', '$scope', '$state', '$stateParams', function(Model, $scope, $state, $stateParams) {


						$scope.note = new Model('note', 'notes/note');
						$scope.note.afterSave = function(note, result) {
							$scope.store.reload();
							$state.go('notes.detail', {noteId: $scope.note.attributes.id});
						};
						$scope.note.load($stateParams.noteId);

						$scope.cancel = function() {
							if ($scope.note.attributes.id) {
								$state.go('notes.detail', {noteId: $scope.note.attributes.id});
							} else
							{
								$state.go('^');
							}
						};
					}]).
				controller('CategoryController', ['Store', '$scope', '$http', 'utils', function(Store, $scope, $http, utils) {

						$scope.pageTitle = 'Notes - Enabled categories';

						$scope.store = new Store('notes/category/store');

						$scope.saveCategory = function(category) {

							$http.get(utils.url("notes/category/toggle", {id: category.id, enabled: category.checked ? 1 : 0}))
											.success(function(result) {
											});
						};

					}]);



