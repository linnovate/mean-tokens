'use strict';

//Tokens service used for tokens REST endpoint
angular.module('mean.system').factory('Tokens', ['$resource', function($resource) {
    return $resource('api/tokens/title/:title', {
        title: '@title'
    }, {
       update: {method: 'PUT'},
       query: {method: 'GET', isArray: true},
       get: {method: 'GET'},
       delete: {method: 'DELETE'}
   });
}]);

//Tokens service used for tokens REST endpoint
angular.module('mean.system').factory('TokensByCategory', ['$resource', function($resource) {
    return $resource('api/tokens/category/:category', {
        title: '@category'
    }, {
       update: {method: 'PUT'},
       query: {method: 'GET', isArray: true},
       get: {method: 'GET'},
       delete: {method: 'DELETE'}
   });
}]);