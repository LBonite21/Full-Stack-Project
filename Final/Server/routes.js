module.exports = function(app) {
    const controller = require('./controllers/controller');
    
    app.route('/')
    .get(controller.list)
    .post(controller.handleSignIn);
}