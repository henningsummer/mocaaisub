function DadosDAO(connection){
   this._connection = connection(); 
}
 

DadosDAO.prototype.pegarDadosMelhor = function(res){

  console.log('rotadados');
  var melhor;
  var rna;
  this._connection.open(function(err, mongoclient){
  
    mongoclient.collection("dadosMelhor", function(err, collection){
      collection.find({}).toArray(function(err, result){
        //res.send(result);
        console.log(result);
        melhor = result;
        mongoclient.close();
        //res.render('monitor',{melhor});
      })
      
    });

    mongoclient.collection("dadosRNA", function(err, collection){
      collection.find({}).toArray(function(err, result){
        //res.send(result);
        console.log(result);
        rna = result;
        mongoclient.close();
        res.render('monitor',{melhor,rna});
      })
      
    });
    
  });
}

DadosDAO.prototype.inserirNuvem = function(dados){
  this._connection.open(function(err, mongoclient){
  
    mongoclient.collection("dadoNuvem", function(err, collection){
      
      collection.insert(dados);
      mongoclient.close();

    });

  });
};


DadosDAO.prototype.inserirLocal = function(dados){
  this._connection.open(function(err, mongoclient){
  
    mongoclient.collection("dadosLocal", function(err, collection){
      
      collection.insert(dados);
      mongoclient.close();

    });

  });
};

DadosDAO.prototype.inserirMelhor = function(dados){
  this._connection.open(function(err, mongoclient){
  
    mongoclient.collection("dadosMelhor", function(err, collection){
      
      collection.insert(dados);
      mongoclient.close();

    });

  });
};

DadosDAO.prototype.inserirRNA = function(dados){
  this._connection.open(function(err, mongoclient){
  
    mongoclient.collection("dadosRNA", function(err, collection){
      
      collection.insert(dados);
      mongoclient.close();

    });

  });
};

module.exports = function(){
  return DadosDAO;
}; 
