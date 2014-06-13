'use strict';

/* Controllers */
angular.module('GO.notes.controllers').

				controller('CategoryController', ['store', '$scope', '$http', 'utils', function(store, $scope, $http, utils) {

						$scope.pageTitle = 'Notes - Enabled categories';

						$scope.store = new store('notes/category/store');

						$scope.saveCategory = function(category) {

							$http.get(utils.url("notes/category/toggle", {id: category.id, enabled: category.checked ? 1 : 0}))
											.success(function(result) {
											});
						};

					}]);



