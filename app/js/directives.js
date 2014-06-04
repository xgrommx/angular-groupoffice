'use strict';

/* Directives */


angular.module('GO.directives', []).
				directive('appVersion', ['version', function(version) {
						return function(scope, elm, attrs) {
							elm.text(version);
						};
					}]).
				directive('goInfiniteScroll', ['$timeout', function($timeout) {
						return{
							scope: {
								goInfiniteScroll: '&',
								goInfiniteScrollDisabled: '='
							},
							link: function(scope, element, attr) {
								var
												lengthThreshold = attr.scrollThreshold || 50,
												timeThreshold = attr.timeThreshold || 400;

								lengthThreshold = parseInt(lengthThreshold, 10);
								timeThreshold = parseInt(timeThreshold, 10);


								var scrollEnabled = true;

								scope.$watch('goInfiniteScrollDisabled', function(v) {
									scrollEnabled = !v;
								});

								var checker = function(){
									
									if(!scrollEnabled){
										return $timeout(checker, timeThreshold);
									}
									
									var	remaining = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);
									
									if (remaining < lengthThreshold) {										
											scope.goInfiniteScroll();
											$timeout(checker, timeThreshold);
									}									
								};

								checker();							
								

								element.bind('scroll', checker);
							}

						};
					}]);
