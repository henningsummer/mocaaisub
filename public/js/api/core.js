  (function(){
        var core = navigator.hardwareConcurrency;
        var agt = navigator.userAgent.replace('(KHTML, like Gecko)','');
        //var arr = agt.split("(");
        //var arr1 = arr[1].toString();
        //var arr2 = arr1.split(")");
          var pos1 = agt.indexOf("(")+1;
          var pos2 = agt.lastIndexOf(")");
          var pos = agt.slice(pos1,pos2);
        var sys = pos.slice(0,pos.indexOf(";"));
        var ver = pos.slice(pos.indexOf(";")+1,pos.lastIndexOf(";"));
        var dev = pos.slice(pos.lastIndexOf(";")+1,pos.lastIndexOf("B"));

  // $(".core-status").append(pos);
  // $(".cpu-sys").append(sys);
  // $(".cpu-ver").append(ver);
  // $(".cpu-dev").append(dev);
  // $(".core-percentage").append(core+" cores");

  document.getElementById('devSYS').innerHTML = sys;
  document.getElementById('devSTAT').innerHTML = dev;
  document.getElementById('devVER').innerHTML = ver;
  document.getElementById('devCPU').innerHTML = 'CPU' + core;
  document.getElementById('devRES').innerHTML = screen.width +'x'+ screen.height;

  document.getElementById('CpuStatus').value = core + ' cores';
  document.getElementById('SysStatus').value = sys;
  document.getElementById('VerStatus').value = ver.trim();
  document.getElementById('DevStatus').value = dev.trim();
  document.getElementById('DevRes').value = screen.width +'x'+ screen.height;
})();