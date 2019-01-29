(function() {
     function handleFileSelect(evt) {
        let files = evt.target.files; // Lista de Arquivos
        // Laço para pegar lista de arquivos e renderizar os Previews
        for (var file of files) {
        // Somente irá processar se for imagem
            if (!file.type.match('image.*')) {
                continue;
            }
            var imagem = new Image(); //Instancia do Objeto Image acessar imagens
            var reader = new FileReader(); //Instancia do FileReader acessar arquivos
            // Função para percorrer informações dos arquivos
            reader.onload = (function(theFile) {
                // Renderizando Previews
                imagem.src = theFile.target.result;
                //var span = document.createElement('span');
                var nome = `${theFile.target.result}`;
                var output = [];
                imagem.onload = function() {
                var height = this.height,
                     width = this.width;
                     document.querySelector('.arquivo').innerHTML = `<ul>${file.type || 'n/a'}</ul>`;
                     document.querySelector('.tamanho').innerHTML = `<ul>${file.size+' bytes' || 'n/a'}</ul>`;
                     document.querySelector('.dimensao').innerHTML = `<ul>${width}x${height}</ul>`;
        
                     document.getElementById('TipoStatus').value = file.type ? file.type : 'n/a';
                     document.getElementById('TamStatus').value = file.size ? file.size + ' bytes' : 'n/a';
                     document.getElementById('DimStatus').value =  width +'x'+height;
                
                     document.getElementById('imgFaces'||'imgOCR').src = nome;
                }
            });
    
            // Ler arquivo da imagem com uma URL.
            reader.readAsDataURL(file);
        }
    }
    
    
    document.getElementById('file').addEventListener('change', handleFileSelect, true);
    

}());