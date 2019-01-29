//ROTA INICIAL
module.exports = function(mocai){

  mocai.get('/', function (req, res) {
    mocai.app.controllers.indexCT.indexs(mocai, req, res);
  });
  
  mocai.get('/monitor', function (req, res) {
    mocai.app.controllers.indexCT.monitor(mocai, req, res);
  });


  //OBTENÇÃO DE DADOS
  mocai.post('/enviar/nuvem', function (req, res) {
    mocai.app.controllers.indexCT.enviarNuvem(mocai, req, res);
  });

  mocai.post('/enviar/local', function (req, res) {
    mocai.app.controllers.indexCT.enviarLocal(mocai, req, res);
  });

  mocai.post('/enviar/melhor', function (req, res) {
    mocai.app.controllers.indexCT.enviarMelhor(mocai, req, res);
  });

  mocai.post('/enviar/rna', function (req, res) {
    mocai.app.controllers.indexCT.enviarRNA(mocai, req, res);
  });

//DEMAIS ROTAS DA APLICAÇÃO
  mocai.post('/fiboNuvem', function (req, res) {
    mocai.app.controllers.indexCT.fiboNuvem(mocai, req, res);
  });

  mocai.get('/ocr', function (req, res) {
    mocai.app.controllers.indexCT.ocr(mocai, req, res);
  });

  mocai.get('/fibo', function (req, res) {
    mocai.app.controllers.indexCT.fibo(mocai, req, res);
  });

  mocai.get('/faces', function (req, res) {
    mocai.app.controllers.indexCT.faces(mocai, req, res);
  });

  mocai.post('/pegarDados', function (req, res) {
    mocai.app.controllers.indexCT.pegarDados(mocai, req, res);
  });
  
};