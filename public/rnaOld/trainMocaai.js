// 24 hours - 100k views, 10k comments, 9500 likes
const brain = require('brain.js');
const dataTrain = require('./dataMocaaiTrain')
const testeTrain = require('./validaGood')
const fs = require('fs')

var config = {
}
//create a simple recurrent neural network
var net = new brain.NeuralNetwork(config);
 var data = dataTrain;

 net.train(data, {log: true});
 
 
 //var json = net.toJSON();
 //fs.writeFileSync('../js/mocaaiRNAjson.js', JSON.stringify(json));

 var run = net.toFunction();
 fs.writeFileSync('../js/mocaaiRNA.js', `${ run };`);


var teste = testeTrain;
console.log("--------------RESULTADO----------------");


  for(var i = 0 ;i < teste.length;i++) {
     console.log(net.run(teste[i])); 
     }
