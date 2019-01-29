// 24 hours - 100k views, 10k comments, 9500 likes
var trainedNet = require ('./mocaaiRNA')
var testeGood = require('./validaGood')
//var testeBad = require('./validaBad')


var nuvem = 0;
var local = 0;
console.log('---------------------')

//  for(var i = 0 ;i < testeBad.length;i++) {
     
//     validar(trainedNet(testeBad[i]),1);
    
// }

for(var i = 0 ;i < testeGood.length;i++) {
     
    validar(trainedNet(testeGood[i]));
    
}

function validar(str){
    
    //console.log(str);
    let valor = JSON.stringify(str);
    //console.log('Valor: '+valor)

    
    var tratar = valor.replace('{"','')
                      .replace('"','')
                      .replace('}','')
                      .replace('"','')
                      .replace('"','');
    //console.log('Tratado: '+tratar);
    var res = tratar.split(",");
    //console.log('Quebrado: '+ res);
    var n1 = res[0].replace('nu:','');
    var n2 = res[1].replace('lc:','');
    //console.log('nu: '+n1);
    //console.log('lc: '+n2);
    var nc = Math.round(n1);
    var lc = Math.round(n2);
    //console.log('nuAr: '+nc+' - '+'lcAr: '+lc);

       //console.log('-----VALIDAR PIOR TEMPO-----');
    if(nc > lc) {
        console.log("Nuvem: "+n1);
    }  
    else {
        console.log("Local:"+n2);
    };

};
