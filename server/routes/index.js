'use strict';
// Tokens routes use tokens controller
var tokens = require('../controllers/tokens');

module.exports = function(Tokens, app, auth,database, circles) {
   var requiresAdmin = circles.controller.hasCircle('admin');

    app.get('/api/tokens', tokens.all);
    app.post('/api/tokens', requiresAdmin, tokens.create);
    app.get('/api/tokens/id/:tokenId', tokens.show);
    app.put('/api/tokens/id/:tokenId', requiresAdmin, tokens.update);
    app.delete('/api/tokens/id/:tokenId', requiresAdmin, tokens.destroy);
    
    app.get('/api/tokens/title', tokens.all);
    app.post('/api/tokens/title/:title', requiresAdmin, tokens.create);
    app.get('/api/tokens/title/:title', tokens.search);
    app.put('/api/tokens/title/:title', requiresAdmin, tokens.updateByTitle);
    app.delete('/api/tokens/title/:title', requiresAdmin, tokens.destroyByTitle);
    
    app.get('/api/tokens/category', tokens.all);
    app.post('/api/tokens/category/:category', requiresAdmin, tokens.create);
    app.get('/api/tokens/category/:category', tokens.all);
    app.put('/api/tokens/category/:category', requiresAdmin, tokens.updateByCategory);

    // Finish with setting up the tokenId param
    app.param('tokenId', tokens.token);

};