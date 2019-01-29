var OCRInicio = 0;
var OCRFim = 0;
var contOCR = 0;
var melhorTempoOCR= 0;
var ResultOCR = 0;
var tempoAuxOCR = 0;
var OCRNuTime = 0;
var OCRLoTime = 0;
var rnaFaceAux = 0;
var loOCRMelhor = 0;
var nuOCRMelhor = 0;
var tempoExec = 0;
var tempoExecRNA = 0;
var tempoExecTotal = 0;
var imgNome = 0;
var imgDetec = 0;
var dataExec = 0;
var escolhaRNA = 0;

function tempoLocalOCR(tipo,dataDia,time,dados,loc,nuv) {
    OCRFim = new Date().getTime();
    var tempoOCRLocal = OCRFim - OCRInicio;
    var OCRDataLocal = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    console.log('Local Tempo: '+tempoOCRLocal);

    document.getElementById('TempoExec').value = tempoOCRLocal +' ms';
    document.getElementById('OndeProc').value = 'Local';
    document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
    imgNome = document.getElementById('ImgNome').value;
    imgDetec = contOCR;
    document.getElementById('ImgDetec').value = contOCR;
    document.getElementById('DataExec').value = OCRDataLocal.getDate()+'/'+
    
    (OCRDataLocal.getMonth()+1)+'/'+
    OCRDataLocal.getFullYear()+
    ' '+OCRDataLocal.getHours()+
    ':'+OCRDataLocal.getMinutes()+
    ':'+OCRDataLocal.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/local',
        type:'post',
        success: function(data){
            OCRLoTime = data;
            if((OCRLoTime != 0) && (OCRNuTime != 0)){
                loOCRMelhor = OCRLoTime.tempoExec.replace(' ms',"");
                nuOCRMelhor = OCRNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loOCRMelhor) < parseInt(nuOCRMelhor)){
                    dadosOCRMelhor(OCRLoTime);
                }else{
                    dadosOCRMelhor(OCRNuTime);
                };
            }; 
        }
    }).submit();
    $('#loaderPage').removeClass('active loaders');
    $('.local').css('display','none')
    var toastHTML=0;
    var materializeToast = function (texto){
        console.log('LOCAL: '+contOCR);
        Materialize.toast(texto,10000);
    }

    if(tipo == "rna"){
        document.getElementById('EscolhaRNA').value = 1;
        escolhaRNA = (loc*100).toFixed(1);
        tempoExec = tempoOCRLocal;
        tempoExecRNA = rnaFaceAux;
        tempoExecTotal = (rnaFaceAux+tempoOCRLocal);
        toastHTML = 
        '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (loc*100).toFixed(1)+'</span>'+' %</a>'+
        '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
        '<a class="mdi mdi-alphabetical left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRLocal+'</span>'+' ms</a>'+
        '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoOCRLocal)+'</span>'+' ms</a>';
        dados.tempoExec = tempoExec;
        dados.tempoExecRNA = tempoExecRNA;
        dados.tempoExecTotal = tempoExecTotal;
        dados.imgDetec = imgDetec;
        dados.imgNome = imgNome;
        dados.dataExec = dataExec;
        dados.escolhaRNA = escolhaRNA;
        dadosOCRRNA(dados);
        nuvemOCR("nuvem");
        materializeToast(toastHTML);
    }if(tipo == "local"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contOCR+'</span>'+' Chars</p>'+
        '<a class="mdi mdi-alphabetical left yellow-text text-accent-3"> Local</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRLocal+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }if(tipo == "nuvem"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contOCR+'</span>'+' Chars</p>'+
        '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRNuvem+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }
};

function localOCR(tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha){
    console.log('Função Local');
    OCRInicio = new Date().getTime();
    rnaOCRTime = OCRInicio - timeRNA;
    $('#transcription').html('');
    OCRAD(imagemOCR, function(text){
        $('#transcription').css("color","rgba(0, 68, 255, 0.966)");
        document.getElementById('transcription').className = "done"
        
        var texto = text.length;
        document.getElementById('transcription').innerHTML = text;//quebraValor.replace('<br>','');
        contOCR = texto;
        tempoLocalOCR(tipo,data,rnaOCRTime,dadosRNA,lcEscolha,nuEscolha);
    })
    
}


	function load_file () {
		var reader = new FileReader();
		reader.onload = function(){
			var img = document.getElementById('imgOCR')
			img.src = reader.result;
			img.onload = function(){
				document.getElementById('nose').innerHTML = ''
				document.getElementById('nose').appendChild(img)			
			}
			imagem = img;
		}
		reader.readAsDataURL(document.getElementById('file').files[0])
	}

function tempoNuvemOCR(tipo,dataDia,time,dados,loc,nuv){
    OCRFim = new Date().getTime();
    var tempoOCRNuvem = OCRFim - OCRInicio;
    var OCRDataNuvem = new Date();
    rnaFaceAux = time;
    dataExec = dataDia;
    console.log('Nuvem Tempo: '+tempoOCRNuvem);      

    document.getElementById('TempoExec').value = tempoOCRNuvem +' ms';
    document.getElementById('OndeProc').value = 'Nuvem';
    document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
    imgNome = document.getElementById('ImgNome').value;
    imgDetec = contOCR;
    document.getElementById('ImgDetec').value = contOCR;
    document.getElementById('DataExec').value = OCRDataNuvem.getDate() +'/'+
    
    (OCRDataNuvem.getMonth()+1)+'/'+
    OCRDataNuvem.getFullYear()+
    ' '+OCRDataNuvem.getHours()+
    ':'+OCRDataNuvem.getMinutes()+
    ':'+OCRDataNuvem.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/nuvem',
        type:'post',
        success: function(data){
            OCRNuTime = data;
            if((OCRLoTime != 0) && (OCRNuTime != 0)){
                loOCRMelhor = OCRLoTime.tempoExec.replace(' ms',"");
                nuOCRMelhor = OCRNuTime.tempoExec.replace(' ms',"");
                if(parseInt(loOCRMelhor) < parseInt(nuOCRMelhor)){
                    dadosOCRMelhor(OCRLoTime);
                }else{
                    dadosOCRMelhor(OCRNuTime);
                };
            }; 
        }
    }).submit();
    $('#loaderPage').removeClass('active loaders');
    $('.nuvem').css('display','none');
    var toastHTML=0;
    var materializeToast = function (texto){
        console.log('NUVEM: '+contOCR);
        Materialize.toast(texto,10000);
    }

    if(tipo == "rna"){
        document.getElementById('EscolhaRNA').value = 1;
        escolhaRNA = (nuv*100).toFixed(1);
        tempoExec = tempoOCRNuvem;
        tempoExecRNA = rnaFaceAux;
        tempoExecTotal = (rnaFaceAux+tempoOCRNuvem);
        toastHTML = 
        '<a class="mdi mdi-thumb-up left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+ (nuv*100).toFixed(1)+'</span>'+' %</a>'+
        '<a class="mdi mdi-robot lime-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+rnaFaceAux+'</span>'+' ms</a>'+
        '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRNuvem+'</span>'+' ms</a>'+
        '<a class="mdi mdi-history left purple-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+(rnaFaceAux+tempoOCRNuvem)+'</span>'+' ms</a>';
        dados.tempoExec = tempoExec;
        dados.tempoExecRNA = tempoExecRNA;
        dados.tempoExecTotal = tempoExecTotal;
        dados.imgDetec = imgDetec;
        dados.imgNome = imgNome;
        dados.dataExec = dataExec;
        dados.escolhaRNA = escolhaRNA;
        dadosOCRRNA(dados);
        localOCR("local");
        materializeToast(toastHTML);
    }if(tipo == "local"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contOCR+'</span>'+' Chars</p>'+
        '<a class="mdi mdi-alphabetical left yellow-text text-accent-3"> Local</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRLocal+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }if(tipo == "nuvem"){
        toastHTML = '<p class="mdi mdi-check-circle left blue-text text-lighten-3"> '+'<span class="yellow-text text-lighten-5">'+contOCR+'</span>'+' Chars</p>'+
        '<a class="mdi mdi-cloud-upload left yellow-text text-accent-3"> Nuvem</a>'+
        '<a class="mdi mdi-history left yellow-text text-accent-3"> '+'<span class="yellow-text text-lighten-5">'+tempoOCRNuvem+'</span>'+' ms</a>';
        materializeToast(toastHTML);
    }
};
function dadosOCRMelhor (dados){
    $('#dadosMelhor').val = dados;
    $('#enviarMelhor').ajaxForm({
        url:'/enviar/melhor',
        type: 'post',
        data: dados,
            success: function(data2){
                OCRLoTime = 0;
                OCRNuTime = 0;
                melhorTempoOCR= 0;
                tempoAuxOCR = 0;
            }
        }).submit();
}

function dadosOCRRNA (dados){
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


function nuvemOCR(tipo,data,timeRNA,dadosRNA,lcEscolha,nuEscolha) {
    console.log('Função Nuvem');
    OCRInicio = new Date().getTime();
    rnaOCRTime = OCRInicio - timeRNA;
    // $('#transcription').css("display","none");
    // $('#transcription2').css("display","block");
    dadosOCRNuvem(tipo,data,rnaOCRTime,dadosRNA,lcEscolha,nuEscolha);
};

function dadosOCRNuvem(tipo,dataDia,rnaOCRTime,dadosRNA,lcEscolha,nuEscolha){
    $('#transcription').html('');
    $('#uploadOCR').ajaxForm({
        url:'/uploadOCR',
        type:'post',
        success: function(data){
            
            $('#transcription').css("color","rgb(36, 121, 10");
            $('#transcription').html(data.resultOCR);
            contOCR = data.contChar;
            document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
            document.getElementById('ImgDetec').value = contOCR;
            tempoNuvemOCR(tipo,dataDia,rnaOCRTime,dadosRNA,lcEscolha,nuEscolha);
        } 
    }).submit();               
};