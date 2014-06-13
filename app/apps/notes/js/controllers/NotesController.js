'use strict';

angular.module('GO.notes.controllers')

				.controller('NotesController', ['$scope', '$state', 'translate', 'Store','msg', function($scope, $state, translate, Store) {

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
					}]);



