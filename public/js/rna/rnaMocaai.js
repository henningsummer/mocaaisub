// 24 hours - 100k views, 10k comments, 9500 likes
function validarMocaai(str) {
    
    let valor = JSON.stringify(str);
    let resultadoRNA = valor.split(',')
    //console.log('RNA: '+resultadoRNA[0].replace('{"nu"','nu').replace('"lc"','lc').replace('}','')+'--'+resultadoRNA[1].replace('{"nu"','nu').replace('"lc"','lc').replace('}',''));

    var rna1 = resultadoRNA[0].replace('{"nu"','nu').replace('"lc"','lc').replace('}','').replace('{"lc"','lc').replace('"nu"','nu');
    var rna2 = resultadoRNA[1].replace('{"nu"','nu').replace('"lc"','lc').replace('}','').replace('{"lc"','lc').replace('"nu"','nu');
    var tratar = valor.replace('{"nu":','').replace('"lc":','').replace('}','');
    
    var quebraRNA1 = rna1.split(':');
    var quebraRNA2 = rna2.split(':');

    var tipoNuvem = 0;
    var tipoLocal = 0;
    if(quebraRNA1[0] == "nu"){
        tipoNuvem = [] = quebraRNA1;
        tipoLocal =  [] = quebraRNA2;
    }else{
        tipoNuvem = quebraRNA2;
        tipoLocal = quebraRNA1;
    }

    var tipoGeral = tipoLocal +','+tipoNuvem;

    console.log(tipoNuvem+' e '+tipoLocal);

    var res = [];
    res = tratar.split(",");
    //console.log(res);
    var localN = parseFloat(tipoLocal[1]);
    var nuvemN = parseFloat(tipoNuvem[1]);
    
    //console.log('local: '+localN +' - '+'nuvem: '+nuvemN);
   
    document.getElementById('redeNeural').innerHTML = ('Local: '+(localN*100).toFixed(1) +'%'+ '|' + 'Nuvem: '+(nuvemN*100).toFixed(1)+'%');
    document.getElementById('redeNeural2').innerHTML = ('Saida: '+valor);
    //console.log('-----VALIDAR PIOR TEMPO-----');
    // if(nuvemN > localN) {
    //     return (tipoNuvem);
    //     console.log("Nuvem RNA");
    // }  
    // else {
    //     return (tipoLocal);
    //     console.log("Local RNA");
    // };

    return(tipoGeral.split(','));
};