/* importar o mongodb */
var mongo = require('mongodb');

var connMongoDB = function(){
	console.log('Conectou com o Banco');
	var db = new mongo.Db(
		'teste3_RNA_3g_Face',
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			32768, //porta de conexão
			{}
		),
		{}
	);
	return db;
};

module.exports = function(){
	return connMongoDB;
};