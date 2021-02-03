module.exports = function(app) {
    const controller = require('./controllers/controller');
    
    app.route('/')
    .get(controller.list)
    .post(controller.handleSignIn);

    app.route('/searchGenre')
    .post(controller.searchByGenre);
    app.route('/searchQuery')
    .post(controller.searchByQuery);
}