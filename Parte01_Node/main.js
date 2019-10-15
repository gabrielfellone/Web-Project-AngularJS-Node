var fn = require('./funcoes');

var m = fn.multiplica(1, 2);
var s = fn.soma(1, 2);
var t = fn.calcular('Curso Node - sábado');

var lista = [2, 4, 5, 9, 13, 8];
var v = fn.contar(lista);

var up = fn.mostrar('Impacta Tecnologia');

console.log('m = ' + m);
console.log('s = ' + s);
console.log('t = ' + t);
console.log('v = ' + v);
console.log('up= ' + up)

var resposta = fn.executar(function(s) {     
    return s.length == 5;
});
console.log('resposta = ' + resposta);

//arrow function
resposta = fn.executar(s => s.toUpperCase());
console.log('resposta = ' + resposta);




//Cuidado com as instruções abaixo:

//require('./funcoes').multiplica(1,2);
//require('./funcoes').soma(1,2);
