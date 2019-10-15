//esta função não é um módulo, pois não utiliza o
//comando 'exports'

//parametro: number
var par = function (n){
    return n % 2 == 0 ? 'par': 'impar'; //string
}

//parametros: number
exports.soma = function(x, y){
    var s = x + y;
    return (s) + ' -> ' + par(s)    //string
}

//parametros: number
exports.multiplica = function(x, y){
    return x * y;                   //number
}

//parametro: string ou array
exports.calcular = function(x){
    return x.length;              //number
}

//parametro: string ou array
exports.contar = function(x){
    return x.length;                //number
}

//parametro: texto (string)
exports.mostrar = function(x){
    return x.toUpperCase();          //string
}




//parametro: function
exports.executar = function(operacao){
    var texto = 'Impacta';
    return operacao(texto);         //? - depende do retorno
}                                   //de operacao()