var faceInicio = 0;
var faceFim = 0;
var contFace = 0;
var melhorTempoFace= 0;
var ResultFace = 0;
var tempoAuxFace;
var faceNuTime = 0;
var faceLoTime = 0;
var rnaFaceAux = 0;
var loFaceMelhor = 0;
var nuFaceMelhor = 0;
var tempoExec = 0;
var tempoExecRNA = 0;
var tempoExecTotal = 0;
var imgNome = 0;
var imgDetec = 0;
var dataExec = 0;
var escolhaRNA = 0;

function tempoLocalFace(tipo,dataDia,time,dados,loc,nuv) {
    tempoAuxFace = 0;
    faceFim = new Date().getTime();
    var tempoFaceLocal = faceFim - faceInicio;
    var dataFaceLocal = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    console.log('Local Tempo: '+tempoFaceLocal);
    console.log('RNA L Tempo: '+rnaFaceAux);
    
    //document.getElementById('TempoTotalLocal').value = tempoFaceLocal;
    tempoAuxFace = tempoFaceLocal;

    document.getElementById('TempoExec').value = tempoFaceLocal +' ms';
    document.getElementById('OndeProc').value = 'Local';
    document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
    imgNome = document.getElementById('ImgNome').value;
    imgDetec = contFace; 
    document.getElementById('DataExec').value = dataFaceLocal.getDate()+'/'+
    
    (dataFaceLocal.getMonth()+1)+'/'+
    dataFaceLocal.getFullYear()+
    ' '+dataFaceLocal.getHours()+
    ':'+dataFaceLocal.getMinutes()+
    ':'+dataFaceLocal.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/local',
        type:'post',
        success: function(data){
            faceLoTime = data;
            console.log(faceLoTime.tempoExec+'-L-'+faceNuTime.tempoExec);
            if((faceLoTime != 0) && (faceNuTime != 0)){
                loFaceMelhor = faceLoTime.tempoExec.replace(' ms',"");
                nuFaceMelhor = faceNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loFaceMelhor) < parseInt(nuFaceMelhor)){
                    dadosFaceMelhor(faceLoTime);
                }else{
                    dadosFaceMelhor(faceNuTime);
                };
            };  
        }
    }).submit();

    $('#loaderPage').removeClass('active loaders');
    $('.local').css('display','none')
    var toastHTML=0;
    var materializeToast = function (texto){
        console.log('LOCAL: '+contFace);
        Materialize.toast(texto,10000);
    }

    if(tipo == "rna"){
        document.getElementById('EscolhaRNA').value = 1;
        escolhaRNA = (loc*100).toFixed(1);
        tempoExec = tempoFaceLocal;
        tempoExecRNA = rnaFaceAux;
        tempoExecTotal = (rnaFaceAux+tempoFaceLocal);
        toastHTML = 
        '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (loc*100).toFixed(1)+'</span>'+' %</a>'+
        '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
        '<a class="mdi mdi-face left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceLocal+'</span>'+' ms</a>'+
        '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoFaceLocal)+'</span>'+' ms</a>';
        dados.tempoExec = tempoExec;
        dados.tempoExecRNA = tempoExecRNA;
        dados.tempoExecTotal = tempoExecTotal;
        dados.imgDetec = imgDetec;
        dados.imgNome = imgNome;
        dados.dataExec = dataExec;
        dados.escolhaRNA = escolhaRNA;
        dadosFaceRNA(dados);
        nuvemFaces("nuvem");
        materializeToast(toastHTML);
    }if(tipo == "local"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFace+'</span>'+' Faces</p>'+
        '<a class="mdi mdi-face left yellow-text text-accent-3"> Local</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceLocal+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }if(tipo == "nuvem"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFace+'</span>'+' Faces</p>'+
        '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceLocal+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }

};

function localFaces(tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha) {
    console.log('Função Local');
    faceInicio = new Date().getTime();
    rnaFaceTime = faceInicio - timeRNA;
    faceTrck(tipo,data,rnaFaceTime,dadosRNA,lcEscolha,nuEscolha);
};

function load_file2 () {
    var reader = new FileReader();
    reader.onload = function(){
        var img = document.getElementById('imgFaces')
        img.src = reader.result;
        img.onload = function(){
            //document.getElementById('imgFaces').innerHTML = ''
            document.getElementById('imgFaces').innerHTML = img;			
        }
        imagem = img;
    }
    reader.readAsDataURL(document.getElementById('file').files[0])
}

function faceTrck(tipo,data,time,dados,loc,nuv){
    var img = document.getElementById('imgFaces');
    var tracker = new tracking.ObjectTracker(['face']);
    tracker.setStepSize(1.7);
    tracking.track('#imgFaces', tracker);
    var faces = [];
    var i = 0;

    tracker.on('track', function(event) {
        event.data.forEach(function(rect) {
            window.plot(rect.x, rect.y, rect.width, rect.height);
            i++;
            faces[i] = (rect.x +'-'+ rect.y +'-'+ rect.width +'-'+ rect.height);
        });
        contFace = i;
        document.getElementById('ImgDetec').value = i;
        document.getElementById('contar').innerHTML = i+' faces encontradas';
        document.getElementById('faces').innerHTML = faces;
        tempoLocalFace(tipo,data,time,dados,loc,nuv);
        
    });
    


    window.plot = function(x, y, w, h) {
       var rect = document.createElement('div');
       document.querySelector('.demo-container').appendChild(rect);
       rect.classList.add('rect');
       rect.style.width = w + 'px';
       rect.style.height = h + 'px';
       rect.style.left = (img.offsetLeft + x) + 'px';
       rect.style.top = (img.offsetTop + y) + 'px';
   };
    
    //COMENTAR ESSA LINHA PARA SAIR DO MODO DE COLETA
};

function tempoFaceNuvem(tipo,dataDia,time,dados,loc,nuv){
    faceFim = new Date().getTime();
    var tempoFaceNuvem = faceFim - faceInicio;
    var dataFaceNuvem = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    console.log('Nuvem Tempo: '+tempoFaceNuvem);
    console.log('RNA N Tempo: '+rnaFaceAux);
    
    
    //var tempFaceCalc = tempoAuxFace;
    //console.log('Diferença do Tempo: '+tempFaceCalc + '-' + tempoFaceNuvem);

   
    
    document.getElementById('TempoExec').value = tempoFaceNuvem +' ms';
    document.getElementById('OndeProc').value = 'Nuvem';
    document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
    imgNome = document.getElementById('ImgNome').value;
    imgDetec = contFace; 
    document.getElementById('DataExec').value = dataFaceNuvem.getDate() +'/'+
    
    (dataFaceNuvem.getMonth()+1)+'/'+
    dataFaceNuvem.getFullYear()+
    ' '+dataFaceNuvem.getHours()+
    ':'+dataFaceNuvem.getMinutes()+
    ':'+dataFaceNuvem.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/nuvem',
        type:'post',
        success: function(data){
            faceNuTime = data;
            console.log(faceLoTime.tempoExec+'-N-'+faceNuTime.tempoExec);   
            if((faceLoTime != 0) && (faceNuTime != 0)){
                loFaceMelhor = faceLoTime.tempoExec.replace(' ms',"");
                nuFaceMelhor = faceNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loFaceMelhor) < parseInt(nuFaceMelhor)){
                    dadosFaceMelhor(faceLoTime);
                }else{
                    dadosFaceMelhor(faceNuTime);
                };
            };             
        }
        }).submit();
        $('#loaderPage').removeClass('active loaders');
        $('.nuvem').css('display','none')
        var toastHTMLN=0;
        var materializeToastN = function (texto){
        console.log('NUVEM: '+contFace);
        Materialize.toast(texto,10000);
        }

        if(tipo == "rna"){
            document.getElementById('EscolhaRNA').value = 1;
            tempoExec = tempoFaceNuvem;
            tempoExecRNA = rnaFaceAux;
            escolhaRNA = (nuv*100).toFixed(1);
            tempoExecTotal = (rnaFaceAux+tempoFaceNuvem);
            toastHTMLN = 
            '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (nuv*100).toFixed(1)+'</span>'+' %</a>'+
            '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
            '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceNuvem+'</span>'+' ms</a>'+
            '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoFaceNuvem)+'</span>'+' ms</a>';
            dados.tempoExec = tempoExec;
            dados.tempoExecRNA = tempoExecRNA;
            dados.tempoExecTotal = tempoExecTotal;
            dados.imgDetec = imgDetec;
            dados.imgNome = imgNome;
            dados.dataExec = dataExec;
            dados.escolhaRNA = escolhaRNA;
            dadosFaceRNA(dados);
            localFaces("local");
            materializeToastN(toastHTMLN);
        }if(tipo == "local"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFace+'</span>'+' Faces</p>'+
            '<a class="mdi mdi-face left yellow-text text-accent-3"> Local</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceLocal+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }if(tipo == "nuvem"){
            toastHTMLN = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contFace+'</span>'+' Faces</p>'+
            '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
            '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoFaceNuvem+'</span>'+' ms</a>';
            materializeToastN(toastHTMLN);
        }
};

function dadosFaceMelhor (dados){
    $('#dadosMelhor').val = dados;
    $('#enviarMelhor').ajaxForm({
        url:'/enviar/melhor',
        type: 'post',
        data: dados,
            success: function(data2){
                faceLoTime = 0;
                faceNuTime = 0;
                melhorTempoFace= 0;
                tempoAuxFace = 0;
            }
        }).submit();
}

function dadosFaceRNA (dados){
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

function nuvemFaces(tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha) {
    console.log('Função Nuvem');
    faceInicio = new Date().getTime();
    rnaFaceTime = faceInicio - timeRNA;
    dadosFacesNuvem(tipo,data,rnaFaceTime,dadosRNA,lcEscolha,nuEscolha);
};

function dadosFacesNuvem(tipo,dataDia,rnaFaceTime,dadosRNA,lcEscolha,nuEscolha){
    $('#uploadForm').ajaxForm({
        url:'/upload',
        type:'post',
        success: function(data){
            $('#imgvalor').html(data.msg);
            $('#contar').html(data.qtdface);
            $('#faces').html(data.arrface);
            $('#imgFaces').attr('src',data.file)
            $('#imgFaces').one('load', function(){
                tempoFaceNuvem(tipo,dataDia,rnaFaceTime,dadosRNA,lcEscolha,nuEscolha);
            }) 
            contFace = data.qtdface;
            //document.getElementById('imgFaces').src = data.file;
            document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
            document.getElementById('ImgDetec').value = contFace;
            // $('#imgFaces').on('change',function(){
                
            // })
            
        } 
    }).submit();               
};