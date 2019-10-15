module.exports = function (app) {
    var mongoose = require('mongoose');
    var Usuario = mongoose.model('usuarios');


    var HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        login: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;

            var query = { 'nome': nome, 'senha': senha };

            Usuario.findOne(query)
                //.select('nome senha')
                .exec(function(erro, usuario){
                    if(erro){
                        //response.redirect('/');                                                
                        response.render('erroServidor', {error : erro })

                    } else if(usuario)  {
                        request.session.usuario = usuario;
                        response.redirect('/menu');
                    } 
                    else {
                        var s_erro = 'Usuário ou senha inválidos',
                        params = { erro: s_erro };
                        response.render('home/index', params);
                    }
                });

        },

        logout: function (request, response) {
            request.session.destroy();
            response.redirect('/');
        },
        novoUsuario: function (request, response) {
            var nome = request.body.usuario.nome;
            var senha = request.body.usuario.senha;
            var confirma = request.body.usuario.confirma;

            if((senha != confirma) || nome.trim().length == 0){
                /*
                    Permanecer no form de cadastro, apresentando
                    uma mensagem de erro
                */
                //response.redirect('/');
                var usuario = request.session.usuario,
                    params = { 
                        usuario: usuario,
                        erro: 'Dados inválidos'}
                response.render('eventos/cadUsuario', params);
            } else {
                var usuario = { nome: nome, senha: senha };

                Usuario.create(usuario, function(erro, usuario){
                    var usuario = request.session.usuario;
                    if(erro){
                        /*
                            Permanecer no form de cadastro, apresentando
                            uma mensagem de erro
                        */
                        response.redirect('/');
                    } else if(usuario) {
                        //apresentar msg de sucesso
                        //response.redirect('/menu');
                        var params = { 
                            usuario: usuario,
                            msg: "Usuário incluído com sucesso"}
                        response.render('eventos/menu',params);
                    } else {
                        var params = { 
                            usuario: usuario, 
                            erro: "Ocorreu um erro inesperado"}
                        response.render('eventos/cadUsuario', params);                        
                    }
                });
            }
        }
    };
    return HomeController;
}