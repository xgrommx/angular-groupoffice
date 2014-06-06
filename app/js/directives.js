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

								var checker = function() {

									if (!scrollEnabled) {
										return $timeout(checker, timeThreshold);
									}

									var remaining = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);

									if (remaining < lengthThreshold) {
										scope.goInfiniteScroll();
										$timeout(checker, timeThreshold);
									}
								};

								checker();


								element.bind('scroll', checker);
							}

						};
					}])
				.directive('goSelect', ['$timeout','Store','Model', function($timeout, Store, Model) {
						var options = {};
						
						return {
							require: 'ngModel',
							priority: 1,
							compile: function(tElm, tAttrs) {
								var watch,
												repeatOption,
												repeatAttr,
												isSelect = tElm.is('select'),
												isMultiple = angular.isDefined(tAttrs.multiple);

								// Enable watching of the options dataset if in use
								if (tElm.is('select')) {
									repeatOption = tElm.find('option[ng-repeat], option[data-ng-repeat]');

									if (repeatOption.length) {
										repeatAttr = repeatOption.attr('ng-repeat') || repeatOption.attr('data-ng-repeat');
										watch = jQuery.trim(repeatAttr.split('|')[0]).split(' ').pop();
									}
								}

								return function(scope, elm, attrs, controller) {
									// instance-specific options
									var opts = angular.extend({}, options, scope.$eval(attrs.goSelect));
									

									/*
									 Convert from Select2 view-model to Angular view-model.
									 */
									var convertToAngularModel = function(select2_data) {
										var model;
										if (opts.simple_tags) {
											model = [];
											angular.forEach(select2_data, function(value, index) {
												model.push(value.id);
											});
										} else {
											model = select2_data.id;
										}
										return model;
									};

									/*
									 Convert from Angular view-model to Select2 view-model.
									 */
									var convertToSelect2Model = function(angular_data) {
										var model = [];
										if (!angular_data) {
											return model;
										}

										if (opts.simple_tags) {
											model = [];
											angular.forEach(
															angular_data,
															function(value, index) {
																model.push({'id': value, 'text': value});
															});
										} else {
											model = angular_data;
										}
										return model;
									};

									if (isSelect) {
										// Use <select multiple> instead
										delete opts.multiple;
										delete opts.initSelection;
									} else if (isMultiple) {
										opts.multiple = true;
									}


									if (attrs.goModel) {
										//eg. 'notes/category/store'

										var storeUri = attrs.goModule + '/' + attrs.goModel + '/store';

										var store = new Store(storeUri);
										var model = new Model(attrs.goModel, attrs.goModule + '/' + attrs.goModel);

										opts.query = function(query) {

											store.query = query.term;

											var promise = store.load();

											promise.then(function(result) {

												var data = {results: []}, items = result.data.results;
												

												for (var i = 0; i < items.length; i++) {
													data.results.push({id: items[i].id, text: items[i].name});
												}


												query.callback(data);
											});
										};

										opts.initSelection = function(element, callback) {
											// the input tag has a value attribute preloaded that points to a preselected movie's id
											// this function resolves that id attribute to an object that select2 can render
											// using its formatResult renderer - that way the movie name is shown preselected
											var id = $(element).val();
											
											if (id !== "") {
												var promise = model.load(id);
												promise.then(function(data) {
													var val = {id: model.attributes.id, text: model.attributes.name};
													callback(val);
												});


											}

										};
									}

									if (controller) {
										// Watch the model for programmatic changes
										scope.$watch(tAttrs.ngModel, function(current, old) {
											if (!current) {
												return;
											}
											if (current === old) {
												return;
											}
											controller.$render();
										}, true);
										controller.$render = function() {
											if (isSelect) {
												elm.select2('val', controller.$viewValue);
											} else {
												if (opts.multiple) {
													var viewValue = controller.$viewValue;
													if (angular.isString(viewValue)) {
														viewValue = viewValue.split(',');
													}
													elm.select2(
																	'data', convertToSelect2Model(viewValue));
												} else {
													if (angular.isObject(controller.$viewValue)) {
														elm.select2('data', controller.$viewValue);
													} else if (!controller.$viewValue) {
														elm.select2('data', null);
													} else {														
														
														//compare as strings to avoid uneeded calls to initSelection
														if(elm.val() !== controller.$viewValue+""){
															elm.select2('val', controller.$viewValue);
														}
													}
												}
											}
										};

										// Watch the options dataset for changes
										if (watch) {
											scope.$watch(watch, function(newVal, oldVal, scope) {
												if (angular.equals(newVal, oldVal)) {
													return;
												}
												// Delayed so that the options have time to be rendered
												$timeout(function() {
													
													
													//compare as strings to avoid uneeded calls to initSelection
													if(elm.val() !== controller.$viewValue+""){
														elm.select2('val', controller.$viewValue);
													
														// Refresh angular to remove the superfluous option
														elm.trigger('change');
														if (newVal && !oldVal && controller.$setPristine) {
															controller.$setPristine(true);
														}
													}
												});
											});
										}

										// Update valid and dirty statuses
										controller.$parsers.push(function(value) {
											var div = elm.prev();
											div
															.toggleClass('ng-invalid', !controller.$valid)
															.toggleClass('ng-valid', controller.$valid)
															.toggleClass('ng-invalid-required', !controller.$valid)
															.toggleClass('ng-valid-required', controller.$valid)
															.toggleClass('ng-dirty', controller.$dirty)
															.toggleClass('ng-pristine', controller.$pristine);
											return value;
										});

										if (!isSelect) {
											// Set the view and model value and update the angular template manually for the ajax/multiple select2.
											elm.bind("change", function(e) {
												e.stopImmediatePropagation();

												if (scope.$$phase || scope.$root.$$phase) {
													return;
												}
												scope.$apply(function() {
													controller.$setViewValue(
																	convertToAngularModel(elm.select2('data')));
												});
											});

											if (opts.initSelection) {
												var initSelection = opts.initSelection;
												opts.initSelection = function(element, callback) {
													initSelection(element, function(value) {
														controller.$setViewValue(convertToAngularModel(value));
														callback(value);
													});
												};
											}
										}
									}

									elm.bind("$destroy", function() {
										elm.select2("destroy");
									});

									attrs.$observe('disabled', function(value) {
										elm.select2('enable', !value);
									});

									attrs.$observe('readonly', function(value) {
										elm.select2('readonly', !!value);
									});

									if (attrs.ngMultiple) {
										scope.$watch(attrs.ngMultiple, function(newVal) {
											attrs.$set('multiple', !!newVal);
											elm.select2(opts);
										});
									}

									// Initialize the plugin late so that the injected DOM does not disrupt the template compiler
									$timeout(function() {
										elm.select2(opts);

										// Set initial value - I'm not sure about this but it seems to need to be there
										//elm.val(controller.$viewValue);
										// important!
										controller.$render();

										// Not sure if I should just check for !isSelect OR if I should check for 'tags' key
										if (!opts.initSelection && !isSelect) {
											controller.$setViewValue(
															convertToAngularModel(elm.select2('data'))
															);
										}
									});
								};
							}
						};
					}])
				.directive('goStoreSearch', function() {
					return {
						restrict: 'E',
						scope: {
							store: '=store'
						},
						templateUrl: 'partials/store/search.html'
					};
				}).directive('autofocus', //autofocus attribute doesn't work dynamically in firefox
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

