'use strict';

var Module = require('meanio').Module;
var Tokens = new Module('mean-tokens');

Tokens.register(function(app) {
	Tokens.routing([app]);
})

