'use strict';

/* Controllers */
angular.module('GO.notes.controllers').

				controller('CategoryController', ['Store', '$scope', '$http', 'utils', function(Store, $scope, $http, utils) {

						$scope.pageTitle = 'Notes - Enabled categories';

						$scope.store = new Store('notes/category/store');

						$scope.saveCategory = function(category) {

							$http.get(utils.url("notes/category/toggle", {id: category.id, enabled: category.checked ? 1 : 0}))
											.success(function(result) {
											});
						};

					}]);



