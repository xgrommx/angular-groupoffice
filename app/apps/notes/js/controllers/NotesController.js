'use strict';

angular.module('GO.notes.controllers')

				.controller('NotesController', ['$scope', '$state', 'translate', 'store','msg', function($scope, $state, translate, store) {

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
					}]);



