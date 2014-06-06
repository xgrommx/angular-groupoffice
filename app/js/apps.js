angular.module('GO.apps', []).provider('apps', [function AppsProvider() {

		var apps = [];

		this.addApp = function(id) {
			var app = {id: id};

			apps.push(app);
		};

		this.$get = [function AppsFactory() {


				// let's assume that the UnicornLauncher constructor was also changed to
				// accept and use the useTinfoilShielding argument
				return apps;
			}];
	}]);