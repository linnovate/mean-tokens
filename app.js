'use strict';

var Module = require('meanio').Module;
var Tokens = new Module('tokens');

Tokens.register(function(app, auth, database, circles) {
	Tokens.routes(app, auth, database, circles);

	Tokens.menus.add({
		title: 'Token Administration',
		link: 'all tokens',
		roles: ['admin'],
		menu: 'main'
	});


});
