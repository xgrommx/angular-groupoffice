'use strict';

/* Directives */


angular.module('GO.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);
//	directive('lrInfiniteScroll', ['$timeout', function (timeout) {
//        return{
//            link: function (scope, element, attr) {
//                var
//                    lengthThreshold = attr.scrollThreshold || 50,
//                    timeThreshold = attr.timeThreshold || 400,
//                    handler = scope.$eval(attr.lrInfiniteScroll),
//                    promise = null,
//                    lastRemaining = 9999;
//
//                lengthThreshold = parseInt(lengthThreshold, 10);
//                timeThreshold = parseInt(timeThreshold, 10);
//
//
//                
//
//                element.bind('scroll', function () {
//                    var
//                        remaining = element[0].scrollHeight - (element[0].clientHeight + element[0].scrollTop);
//
//                    //if we have reached the threshold and we scroll down
//                    if (remaining < lengthThreshold && (remaining - lastRemaining) < 0) {
//											
//											console.log('test');	
//
//                        //if there is already a timer running which has no expired yet we have to cancel it and restart the timer
//                        if (promise !== null) {
//                            timeout.cancel(promise);
//                        }
//                        promise = timeout(function () {
//                            handler();
//                            promise = null;
//                        }, timeThreshold);
//                    }
//                    lastRemaining = remaining;
//                });
//            }
//
//        };
//    }]);
