'use strict';



angular.module('GO.directives')
				.directive('autofocus', //autofocus attribute doesn't work dynamically in firefox
				function($timeout) {
					return {
						scope: {
							trigger: '@focus'
						},
						link: function(scope, element) {
							scope.$watch('trigger', function(value) {								
									$timeout(function() {
										element[0].focus();
									});
							});
						}
					};
				});

