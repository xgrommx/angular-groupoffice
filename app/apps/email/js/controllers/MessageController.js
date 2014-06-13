'use strict';

angular.module('GO.controllers')
				.controller('MessageController', ['$sce', 'Model', '$scope', '$state', '$stateParams','loadNote', function($sce, Model, $scope, $state, $stateParams,  loadNote) {
						$scope.message = new Model('message', 'email/message');
						$scope.message.updateAction = 'get';
						$scope.message.idAttribute='uid';
						$scope.message.baseParams = {account_id:$stateParams.accountId, mailbox: $stateParams.mailbox};
						
						$scope.message.afterLoad=function(model, result){

							$scope.message.attributes.htmlbody = $sce.trustAsHtml($scope.message.attributes.htmlbody);
						};
						
						$scope.message.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('messages');
						};
						
						$scope.message.load($stateParams.uid);

					}]);
				

