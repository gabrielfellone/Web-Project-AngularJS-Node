module.exports = function(app){
    var homecont = app.controllers.home;
    app.get('/', homecont.index);
    app.post('/login', homecont.login);
    app.get('/logout', homecont.logout);

    app.post('/novoUsuario', homecont.novoUsuario);
}