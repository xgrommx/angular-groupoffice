'use strict';

/* Controllers */

angular.module('GO.notes.controllers', ['GO.notes'])

				.controller('NotesController', ['$scope', '$state', 'translate', 'Store','msg', function($scope, $state, translate, Store) {

						
						console.log(translate);
		
						$scope.pageTitle = translate.t('Notes');
						

						$scope.contentActive = function() {
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
				controller('NoteDetailController', ['Model', '$scope', '$state', '$stateParams','loadNote', function(Model, $scope, $state, $stateParams,  loadNote) {
						$scope.note = new Model('note', 'notes/note');
						$scope.note.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('notes');
						};
						
						loadNote($scope, $stateParams.noteId);

					}]).
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



