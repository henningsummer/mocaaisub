module.exports.monitor = function (mocai, req, res){
    var connection =  mocai.config.dbConnection;
    var DadosDAO = new mocai.app.models.DadosDAO(connection);
    DadosDAO.pegarDadosMelhor(res)  
};

module.exports.indexs = function (mocai, req, res){
    res.render('index');  
};


// module.exports.pegarDados = function(mocai, req, res){

//     var connection =  mocai.config.dbConnection;
//     var DadosDAO = new mocai.app.models.DadosDAO(connection);
    
//     DadosDAO.pegarDadosMelhor(res);


// };

module.exports.enviarNuvem = function(mocai, req, res){

    var dadosNuvem = req.body;
    
    //console.log(mocai);

    var connection =  mocai.config.dbConnection;
    //console.log(connection);
    var DadosDAO = new mocai.app.models.DadosDAO(connection);
    
    DadosDAO.inserirNuvem(dadosNuvem);

    res.send(dadosNuvem);
};

module.exports.enviarLocal = function(mocai, req, res){

    var dadosLocal = req.body;
    
    //console.log(mocai);

    var connection =  mocai.config.dbConnection;
    //console.log(connection);
    var DadosDAO = new mocai.app.models.DadosDAO(connection);
    
    DadosDAO.inserirLocal(dadosLocal);

    res.send(dadosLocal);
};

module.exports.enviarMelhor= function(mocai, req, res){

    var dadosMelhor = req.body;
    
    console.log(dadosMelhor);

    var connection =  mocai.config.dbConnection;
    //console.log(connection);
    var DadosDAO = new mocai.app.models.DadosDAO(connection);
    
    DadosDAO.inserirMelhor(dadosMelhor);

    res.send(dadosMelhor);
};

module.exports.enviarRNA= function(mocai, req, res){

    var dadosRNA = req.body;
    
    console.log(dadosRNA);

    var connection =  mocai.config.dbConnection;
    //console.log(connection);
    var DadosDAO = new mocai.app.models.DadosDAO(connection);
    
    DadosDAO.inserirRNA(dadosRNA);

    res.send(dadosRNA);
};

module.exports.ocr = function (mocai, req, res){
    res.render('ocr');  
};

module.exports.fibo = function (mocai, req, res){
    res.render('fibo');  
};

module.exports.faces = function (mocai, req, res){
    res.render('faces');  
};

module.exports.fiboNuvem = function (mocai, req, res){
    
    var numero = req.body;
    console.log('up: '+numero.fibo);
     var fibonum = fiboRec(numero.fibo || numero.fibonacci); 
        res.send({
             fibo: fibonum,
             numero: numero.fibo || numero.fibonacci
        });
        console.log("Numero: "+fibonum);
        function fiboRec (num) {
            if (num <= 1) return 1;
          
            return fiboRec(num - 1) + fiboRec(num - 2);
        }
    };
    
    