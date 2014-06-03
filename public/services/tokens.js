'use strict';

//Tokens service used for tokens REST endpoint
angular.module('mean.system').factory('Tokens', ['$resource', function($resource) {
    return $resource('tokens/title/:title', {
        title: '@title'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
