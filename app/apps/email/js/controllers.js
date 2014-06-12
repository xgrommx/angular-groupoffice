'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('AccountController', ['$scope', '$state', 'Store', function($scope, $state, Store) {

						$scope.pageTitle = 'E-mail';

						$scope.store = new Store('email/account/store',
										{
											limit: 10
										});
					}])
				.controller('EmailController', ['$scope', '$state', '$stateParams', 'Store', function($scope, $state, $stateParams, Store) {

						$scope.pageTitle = 'E-mail';

						$scope.contentActive = function() {
							return !$state.is('messages');
						};
						
						$scope.mailbox = $stateParams.mailbox;
						$scope.account_id= $stateParams.accountId;

						$scope.store = new Store('email/message/store',
										{
											account_id: $scope.account_id,
											mailbox: $scope.mailbox,
											limit: 10,
											sort:'date',
											dir:'DESC'
										});
					}]).
					controller('MessageController', ['$sce', 'Model', '$scope', '$state', '$stateParams','loadNote', function($sce, Model, $scope, $state, $stateParams,  loadNote) {
						$scope.message = new Model('message', 'email/message');
						$scope.message.updateAction = 'get';
						$scope.message.idAttribute='uid';
						$scope.message.baseParams = {account_id:$stateParams.accountId, mailbox: $stateParams.mailbox};
						
						$scope.message.afterLoad=function(model, result){
							
//							console.log(model);
							$scope.message.attributes.htmlbody = $sce.trustAsHtml($scope.message.attributes.htmlbody);
						};
						
						$scope.message.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('messages');
						};
						
						$scope.message.load($stateParams.uid);

					}]);
				

