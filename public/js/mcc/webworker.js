onmessage = function(e) {
    console.log(e.data + ' chego no worker');
    
    function fiboRec(num) {
        if (num <= 1) return 1;
        return fiboRec(num - 1) + fiboRec(num - 2);
    }
    var resultWorker = fiboRec(e.data);
    postMessage(resultWorker);
    console.log('devolve '+fiboRec(e.data) + typeof(resultWorker));
}
