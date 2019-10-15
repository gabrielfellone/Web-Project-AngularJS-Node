var express = require('express');
var load = require('express-load');

var bodyParser = require('body-parser'); //instalar
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var error = require('./middlewares/error');

app = express();

//configurando o mongoose (mongo db)
var mongoose = require('mongoose');
global.db = mongoose.connect('mongodb://localhost:27017/neventos', {useNewUrlParser:true, useUnifiedTopology: true});

//eventos do mongoose
mongoose.connection.on('connected', function(){
  console.log('=====Conexão estabelecida com sucesso=====');
});

mongoose.connection.on('error', function(error){
  console.log('=====Ocorreu um erro: ' + error);
});

mongoose.connection.on('disconnected', function(){
  console.log('=====Conexão finalizada=====');
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser('nodeEventos'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

//middlewares - após a definição do controller, para que este 
//seja interceptado adequadamente
app.use(error.notFound);
app.use(error.serverError);

app.listen(3000, function(){
  console.log('Aplicação no ar');
});