//VARIAVEIS
var FiboInicio = 0;
var FiboFim = 0;
var contFibo = 0;
var melhorTempoFibo= 0;
var ResultFibo = 0;
var tempoAuxFibo;
var fiboNuTime = 0;
var fiboLoTime = 0;
var loFiboMelhor = 0;
var nuFiboMelhor = 0;
var tempoExec = 0;
var tempoExecRNA = 0;
var tempoExecTotal = 0;
var imgNome = 0;
var imgDetec = 0;
var dataExec = 0;
var ondeProc = 0;
var escolhaRNA = 0;
var numFiboTime = 0;
//TEMPO LOCAL

function tempoLocalFibo(numfibo,tipo,resultado,dataDia,time,dados,loc,nuv) {
    FiboFim = new Date().getTime();
    var tempoFibolocal = FiboFim - FiboInicio;
    var fiboDataLocal = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    imgDetec = resultado;
    imgNome = 'fibo'+numfibo;
    console.log('Tempo Local: '+tempoFibolocal);
    
    
    document.getElementById('TempoExec').value = tempoFibolocal +' ms';
    document.getElementById('OndeProc').value = 'Local';
    document.getElementById('ImgNome').value = 'fibo'+ numfibo;//document.getElementById('fiboValor2').value;
    document.getElementById('TipoStatus').value = 'text/calc';
    document.getElementById('TamStatus').value =  numfibo * 100000;//document.getElementById('fiboValor2').value;
    document.getElementById('DimStatus').value = numfibo * 100000;//document.getElementById('fiboValor2').value;


    document.getElementById('DataExec').value = fiboDataLocal.getDate()+'/'+
    
    (fiboDataLocal.getMonth()+1)+'/'+
    fiboDataLocal.getFullYear()+
    ' '+fiboDataLocal.getHours()+
    ':'+fiboDataLocal.getMinutes()+
    ':'+fiboDataLocal.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/local',
        type:'post',
        success: function(data){
            fiboLoTime = data;   
            if(fiboLoTime != 0 && fiboNuTime != 0){
                loFiboMelhor = fiboLoTime.tempoExec.replace(' ms',"");
                nuFiboMelhor = fiboNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loFiboMelhor) < parseInt(nuFiboMelhor)){
                        dadosFiboMelhor(fiboLoTime);
                    }else{
                        dadosFiboMelhor(fiboNuTime);
                    v
                };
            };             
        }
    }).submit();
            
    $('#loaderPage').removeClass('active loaders');
    $('.local').css('display','none')
    var toastHTMLN=0;
        var materializeToastN = function (texto){
        console.log('NUVEM: '+contFibo);
        Materialize.toast(texto,10000);
        }

        if(tipo == "rna"){
            document.getElementById('EscolhaRNA').value = 1;
            tempoExec = tempoFibolocal;
            tempoExecRNA = rnaFaceAux;
            escolhaRNA = (loc*100).toFixed(1);
            tempoExecTotal = (rnaFaceAux+tempoFibolocal);
            toastHTMLN = 
            '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (loc*100).toFixed(1)+'</span>'+' %</a>'+
            '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
            '<a class="mdi mdi-function left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFibolocal+'</span>'+' ms</a>'+
            '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoFibolocal)+'</span>'+' ms</a>';
            dados.ondeProc = ondeProc;
            dados.tempoExec = tempoExec;
            dados.tempoExecRNA = tempoExecRNA;
            dados.tempoExecTotal = tempoExecTotal;
            dados.imgDetec = imgDetec;
            dados.imgNome = imgNome;
            dados.dataExec = dataExec;
            dados.escolhaRNA = escolhaRNA;
            dadosFiboRNA(dados);
            fiboNuvem(numfibo,"nuvem");
            materializeToastN(toastHTMLN);
        }if(tipo == "local"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFibo+'</span>'+' Fibos</p>'+
            '<a class="mdi mdi-function left yellow-text text-accent-3"> Local</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFibolocal+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }if(tipo == "nuvem"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFibo+'</span>'+' Fibos</p>'+
            '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFiboNuvem+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }      
};


//CHAMADA LOCAL
function fiboLocal(num,tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha) {
    console.log('Fibo Local');
    FiboInicio = new Date().getTime();
    numFiboTime = FiboInicio - timeRNA;
    var valor = document.querySelector('#fiboValor2').value;
    var result = 0;

    if (window.Worker) {
    var fiboWorker = new Worker('./js/mcc/webworker.js');
    
    fiboWorker.postMessage(valor);
    console.log('worker manda' + valor);

    fiboWorker.onmessage = function(e){
        document.getElementById('fiboResult').value  = e.data;
        result = document.getElementById('fiboResult').value;
       

    console.log('chega '+ result);
    contFibo = valor;
    ondeProc = "Local";
    imgDetec = result;
    //tempoLocalFibo();
    //console.log('VAI:' +valor);
    document.getElementById('fiboResult').style.color = "rgba(0, 68, 255, 0.966)";
    document.getElementById('fiboResult').innerHTML = result;

    tempoLocalFibo(valor,tipo,result,data,numFiboTime,dadosRNA,lcEscolha,nuEscolha);
    }
}
    //fiboNuvem(numeros);
};

// function fiboRec(num) {
//     if (num <= 1) return 1;
//     return fiboRec(num - 1) + fiboRec(num - 2);
// }

//CHAMADA NUVEM
function tempoNuvemFibo(numfibo,tipo,resultado,dataDia,time,dados,loc,nuv){
    FiboFim = new Date().getTime();
    var tempoFiboNuvem = FiboFim - FiboInicio;
    var dataFiboNuvem = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    imgDetec = resultado;
    imgNome = 'fibo'+numfibo;
    console.log('Tempo Nuvem: '+tempoFiboNuvem);
    //console.log('numFN: '+ numfibo);

    document.getElementById('TempoExec').value = tempoFiboNuvem +' ms';
    document.getElementById('OndeProc').value = 'Nuvem';
    document.getElementById('ImgDetec').value = document.getElementById('fiboResult').value;
    document.getElementById('ImgNome').value = 'fibo'+numfibo;//document.getElementById('fiboValor2').value;
    document.getElementById('TipoStatus').value = 'text/calc';
    document.getElementById('TamStatus').value =  numfibo * 100000;//document.getElementById('fiboValor2').value;
    document.getElementById('DimStatus').value = numfibo * 100000;//document.getElementById('fiboValor2').value;
    document.getElementById('ImgDetec').value = ResultFibo;
    

    document.getElementById('DataExec').value = dataFiboNuvem.getDate() +'/'+

    
    (dataFiboNuvem.getMonth()+1)+'/'+
    dataFiboNuvem.getFullYear()+
    ' '+dataFiboNuvem.getHours()+
    ':'+dataFiboNuvem.getMinutes()+
    ':'+dataFiboNuvem.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/nuvem',
        type:'post',
        success: function(data){
            fiboNuTime = data;   
            if(fiboLoTime != 0 && fiboNuTime != 0){
                loFiboMelhor = fiboLoTime.tempoExec.replace(' ms',"");
                nuFiboMelhor = fiboNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loFiboMelhor) < parseInt(nuFiboMelhor)){
                        dadosFiboMelhor(fiboLoTime);
                    }else{
                        dadosFiboMelhor(fiboNuTime);
                    v
                };
            };             
        }
    }).submit();

    $('#loaderPage').removeClass('active loaders');
    $('.nuvem').css('display','none')
    var toastHTMLN=0;
        var materializeToastN = function (texto){
        console.log('NUVEM: '+contFibo);
        Materialize.toast(texto,10000);
        }

        if(tipo == "rna"){
            document.getElementById('EscolhaRNA').value = 1;
            tempoExec = tempoFiboNuvem;
            tempoExecRNA = rnaFaceAux;
            escolhaRNA = (nuv*100).toFixed(1);
            tempoExecTotal = (rnaFaceAux+tempoFiboNuvem);
            toastHTMLN = 
            '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (nuv*100).toFixed(1)+'</span>'+' %</a>'+
            '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
            '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFiboNuvem+'</span>'+' ms</a>'+
            '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoFiboNuvem)+'</span>'+' ms</a>';
            dados.ondeProc = ondeProc;
            dados.tempoExec = tempoExec;
            dados.tempoExecRNA = tempoExecRNA;
            dados.tempoExecTotal = tempoExecTotal;
            dados.imgDetec = imgDetec;
            dados.imgNome = imgNome;
            dados.dataExec = dataExec;
            dados.escolhaRNA = escolhaRNA;
            dadosFiboRNA(dados);
            fiboLocal(numfibo,"local");
            materializeToastN(toastHTMLN);
        }if(tipo == "local"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFibo+'</span>'+' Faces</p>'+
            '<a class="mdi mdi-function left yellow-text text-accent-3"> Local</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFibolocal+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }if(tipo == "nuvem"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFibo+'</span>'+' Faces</p>'+
            '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFiboNuvem+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }


};

function dadosFiboMelhor (dados){
    $('#dadosMelhor').val = dados;
    $('#enviarMelhor').ajaxForm({
        url:'/enviar/melhor',
        type: 'post',
        data: dados,
            success: function(data2){
                fiboLoTime = 0;
                fiboNuTime = 0;
                melhorTempoFibo= 0;
                tempoAuxFibo = 0;
            }
        }).submit();
}

function dadosFiboRNA (dados){
    $('#dadosRNA').val = dados;
    $('#enviarRNA').ajaxForm({
        url:'/enviar/rna',
        type: 'post',
        data: dados,
            success: function(data){
                // faceLoTime = 0;
                // faceNuTime = 0;
                // melhorTempoFace= 0;
                // tempoAuxFace = 0;
            }
        }).submit();
}


function fiboNuvem(num,tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha) {
    console.log('Fibo Nuvem');
    FiboInicio = new Date().getTime();
    numFiboTime = FiboInicio - timeRNA;
    var valor2 = document.getElementById('fiboValor2').value;;
    dadosFiboNuvem(valor2,tipo,data,numFiboTime,dadosRNA,lcEscolha,nuEscolha);
};

function dadosFiboNuvem(num,tipo,dataDia,numFiboTime,dadosRNA,lcEscolha,nuEscolha){
    //console.log('NumvUP: '+valor);
    $('#fiboForm').ajaxForm({
        //data: { fibo: valor},
        url:'/fiboNuvem',
        type:'post',
        success: function(data){
            $('#fiboResult').css("color","rgb(36, 121, 10");
            $('#fiboResult').html(data.fibo);
            ResultFibo = data.fibo;
            contFibo = data.numero;
            ondeProc = "Nuvem";
            imgDetec = data.fibo;
            console.log('EY: '+num);
            tempoNuvemFibo(num,tipo,ResultFibo,dataDia,numFiboTime,dadosRNA,lcEscolha,nuEscolha);
        } 
    }).submit();
};

