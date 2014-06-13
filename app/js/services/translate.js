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

						this.$get = [function() {

								return {
									language: language,
									translations: translations,
									t : function(text) {			
										if(!this.translations[this.language] || !this.translations[this.language][text]){
											if(language!=='en'){
												//console.log("WARNING: Translation missing for '"+text+"' in language '"+this.language+"'");
											}
											return text;
										}
											
										return this.translations[this.language][text];
									}									
								};
							}];
					}])
				.filter('t', ['translate',function(translate) {
						return function(key) {
							return translate.t(key);
						};
					}]);
	
							