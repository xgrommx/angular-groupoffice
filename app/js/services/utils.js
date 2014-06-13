'use strict';

angular.module('GO.services').
				service('utils', [function() {

						var utils = function() {
							this.baseUrl = localStorage.baseUrl;

							//Use sessionStorage from browser so it survives browser reloads						
							this.securityToken = sessionStorage.securityToken;
						};

						utils.prototype.setBaseUrl = function(url) {

							//Use localStorage to remember it for the user
							this.baseUrl = localStorage.baseUrl = url.replace(/^\s+|[\s\/]+$/g, '') + '/';
						};


						utils.prototype.setSecurityToken = function(token) {
							this.securityToken = sessionStorage.securityToken = token;
						};

						utils.prototype.url = function(relativeUrl, params) {
							if (!relativeUrl && !params)
								return this.baseUrl;
							var url = this.baseUrl + "index.php?r=" + relativeUrl + "&security_token=" + this.securityToken;
							if (params) {
								for (var name in params) {
									url += "&" + name + "=" + encodeURIComponent(params[name]);
								}
							}
							return url;
						};

						return new utils;
					}]);