module.exports = function (app) {

    var Evento = app.models.eventos;

    var EventosController = {
        menu: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };

            response.render('eventos/menu', params);

        },
        cadastroUsuario: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadUsuario', params);
        },
        cadastroEvento: function (request, response) {
            var usuario = request.session.usuario,
                params = { usuario: usuario };
            response.render('eventos/cadEvento', params);
        },
        listaEventos: function (request, response) {

            var moment = require('moment');

            Evento.find(function(erro, eventos){
                if(erro){
                    response.redirect('/menu');
                }
                else{
                    var usuario = request.session.usuario,
                    params = { 
                        usuario: usuario, 
                        eventos: eventos,
                        moment: moment };

                    response.render('eventos/listaEventos', params);    
                }
            })
        },
        novoEvento: function (request, response) {
            //código a ser implementado
            var evento = request.body.evento;

            if(evento.descricao.trim().length == 0 || 
                evento.data == 'undefined' ||
                evento.preco.trim().length == 0){
                    response.redirect('/cadEvento');
            }
            else {
                Evento.create(evento, function(erro, evento){
                    if(erro){
                        response.redirect('/cadEvento');
                    }
                    else if(evento) {
                        //apresentar msg de sucesso
                        //response.redirect('/menu');
                        var usuario = request.session.usuario,
                            params = { 
                                usuario: usuario, 
                                msg: "Evento incluído com sucesso"}
                        response.render('eventos/menu',params);
                    }
                    else {
                        var params = { erro: "Ocorreu um erro na inclusão"}
                        response.render('eventos/menu', params);                        
                    }
                });
            }            
        }
    };

    return EventosController;
}