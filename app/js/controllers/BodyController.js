'use strict';

angular.module('GO.controllers')
				.controller('BodyController', ['$scope', 'httpRequestTracker', function($scope, httpRequestTracker) {
						
						$scope.hasPendingRequests = function() {
//							return httpRequestTracker.hasPendingRequests();
						};

					}]);