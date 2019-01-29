(function() {
     var ChromeSamples = {
         log: function() {
          var line = Array.prototype.slice.call(arguments).map(function(argument) {
              return typeof argument === 'string' ? argument : JSON.stringify(argument);
          }).join(' ');
         document.querySelector('.network-percentage').innerHTML += line;
        },
    };


    var times = 1;
    var log = function(args) {
        ChromeSamples.log(args);
        if (times % 5 == 0) {
            ChromeSamples.log('');
        }
        times++;
    };

       
    navigator.connection.addEventListener('change', logNetworkInfo);
    
        function logNetworkInfo() {
        
        if(navigator.connection.rtt == '0' || navigator.connection.type == 'none'){
            document.querySelector('.status').innerHTML = 'Offline';
            document.querySelector('.rede').innerHTML = 0 + 'Mb/s';
            document.querySelector('.link').innerHTML = 0 + 'Mb/s';
            document.querySelector('.tts').innerHTML = 0 + 'ms';
            document.querySelector('.movel').innerHTML = navigator.connection.status;
            $('.btnOff').css("display","none");
        }else{
                
        document.querySelector('.status').innerHTML = '<strong>Status: </strong>'+navigator.connection.type;
        document.querySelector('.rede').innerHTML = '<strong>Rede: </strong style="color: red">'+navigator.connection.downlink + ' Mb/s';
        document.querySelector('.link').innerHTML = '<strong>Link: </strong>'+navigator.connection.downlinkMax + ' Mb/s';
        document.querySelector('.tts').innerHTML = '<strong>TTS: </strong>'+navigator.connection.rtt + ' ms';
        document.querySelector('.movel').innerHTML = '<strong>Móvel: </strong>'+navigator.connection.effectiveType;
        var statusnet = navigator.connection.type;
        var redenet = navigator.connection.downlink;
        var linknet = navigator.connection.downlinkMax;
        var ttsnet = navigator.connection.rtt;
        var movelnet = navigator.connection.effectiveType ; 
        document.getElementById('NetStatus').value = statusnet;
        document.getElementById('RedeStatus').value = redenet+' Mb/s';
        document.getElementById('LinkStatus').value = linknet + ' Mb/s';
        document.getElementById('TtsStatus').value = ttsnet + ' ms';
        document.getElementById('MovelStatus').value = movelnet;
        $('.btnOff').css("display","initial");
    }
   }
    
    logNetworkInfo();
    
}());