


angular.module('GO.translate', [])
				.provider('translate', [function TranslateProvider() {

						var translations = {};

						var language = 'nl';
						
						this.setLanguage = function(lang){
							language=lang;
						};

						this.addTranslations = function(lang, newTranslations) {

							if (!translations[lang])
								translations[lang] = {};

							angular.extend(translations[lang], newTranslations);
						};

						

						this.$get = [function AppsFactory() {

								return {
									language: language,
									translations: translations,
									t : function(text) {			
										if(!this.translations[this.language])
											return text;
											
										return this.translations[this.language][text] || text;
									}									
								};
							}];
					}]).filter('t', ['translate',function(translate) {
						return function(key) {
							return translate.t(key);
						};
					}]);
	
							