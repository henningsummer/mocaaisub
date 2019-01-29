var localInicio = 0;
var localFim = 0;
var contFLocal = 0;

function tempoLocal() {
    localFim = new Date().getTime();
    var tempoTLocal = localFim - localInicio;
    var dataLocal = new Date();
    //console.log('Local: '+tempoTLocal);
    
    document.getElementById('TempoTotalLocal').value = tempoTLocal;
    
    document.getElementById('TempoExec').value = tempoTLocal +' ms';
    document.getElementById('OndeProc').value = 'Local';
    document.getElementById('ImgNome').value = document.getElementById('fileUpload').value;
    document.getElementById('DataExec').value = dataLocal.getDate()+'/'+
    
    (dataLocal.getMonth()+1)+'/'+
    dataLocal.getFullYear()+
    ' '+dataLocal.getHours()+
    ':'+dataLocal.getMinutes()+
    ':'+dataLocal.getSeconds();

    $('#enviarDados').ajaxForm({
        url:'/enviar/dados',
        type:'post',
        success: function(data){}
    }).submit();
    
    document.getElementById('PiorTime').value = "";
    //var toastHTML = '<span>I am toast content</span><button class="btn-flat toast-action">Undo</button>';
    //Materialize.toast(toastHTML,1000);
    Materialize.toast('Total Faces: '+contFLocal+ ' | Tempo Local: '+tempoTLocal+' ms',10000);    
    
};


function local() {
    
    //console.log('Função Local');
    localInicio = new Date().getTime();

    faceTrck();
    function faceTrck(){
        var img = document.getElementById('imgFaces');
        var tracker = new tracking.ObjectTracker(['face']);
        tracker.setStepSize(1.7);
        tracking.track('#imgFaces', tracker);
        var face = [];
        var i = 0;

        tracker.on('track', function(event) {

            event.data.forEach(function(rect) {

                window.plot(rect.x, rect.y, rect.width, rect.height);
                i++;
                            
            });
            

            document.getElementById('contar').innerHTML = i+' faces encontradas';
            document.getElementById('faces').innerHTML = faces;
            contFLocal = i;
            
            document.getElementById('ImgDetec').value = contFLocal;
        });

        window.plot = function(x, y, w, h) {
            console.log(x + '-' + y + '-' + w + '-' + h);
            var rect = document.createElement('div');
            document.querySelector('.demo-container').appendChild(rect);
            rect.classList.add('rect');
            rect.style.width = w + 'px';
            rect.style.height = h + 'px';
            rect.style.left = (img.offsetLeft + x) + 'px';
            rect.style.top = (img.offsetTop + y) + 'px';
        };
        setTimeout(tempoLocal, -1);
    };        
};

