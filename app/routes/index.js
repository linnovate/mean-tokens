'use strict';

// Tokens routes use tokens controller
var tokens = require('../controllers/tokens');

// Token authorization helpers
var hasAuthorization = function(req, res, next) {
    // if (req.user.role !== 'admin') {
 //        return res.send(401, 'User is not authorized');
 //    }
    next();
};

module.exports = function(app) {

    app.get('/tokens', tokens.all);
    app.post('/tokens', hasAuthorization, tokens.create);
    app.get('/tokens/id/:tokenId', tokens.show);
    app.put('/tokens/id/:tokenId', hasAuthorization, tokens.update);
    app.del('/tokens/id/:tokenId', hasAuthorization, tokens.destroy);
    
    app.get('/tokens/title', tokens.all);
    app.post('/tokens/title/:title', hasAuthorization, tokens.create);
    app.get('/tokens/title/:title', tokens.search);
    app.put('/tokens/title/:title', hasAuthorization, tokens.updateByTitle);
    app.del('/tokens/title/:title', hasAuthorization, tokens.destroyByTitle);
    
    app.get('/tokens/category', tokens.all);
    app.post('/tokens/category/:category', hasAuthorization, tokens.create);
    app.get('/tokens/category/:category', tokens.all);
    app.put('/tokens/category/:category', hasAuthorization, tokens.updateByCategory);

    // Finish with setting up the tokenId param
    app.param('tokenId', tokens.token);

};