const OCRAD = require('../../public/js/lib/ocrad.js');
const Canvas = require('canvas');
const Image = Canvas.Image;
const fs = require('fs');
const multer = require ('multer');
const path = require('path');

module.exports = function (mocai){


    const storage = multer.diskStorage({
        destination: './public/uploads/',
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    //
    
    const upload = multer({ 
        storage: storage,
        limits: { fileSize: 8000000},
        fileFilter: function(req, file, cb) {
        checkFileType( file, cb);
        }
    }).single('Imagem');
    
    function checkFileType(file, cb) {
        // Allowed ext
        const filetypes = /png/;
        // Check ext
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Check mime
        const mimetype = filetypes.test(file.mimetype);
    
        if (mimetype && extname) {
            return cb(null, true);
        }else{
            cb('Error: Images Only!');
        }
    }


    mocai.post("/uploadOCR", (req, res) => {
    
        upload(req, res, (err) => {

            
            var imgdet = req.file.path.replace(/[\\"]/g, '/');
            var count;
            var imagem = imgdet.replace("public/uploads/", "");
            console.log("Arquivo: " + imgdet);
            console.log("Arquivo: " + imagem);
        if(imagem){
            //imgdet = req.file.path;
            //console.log("Arquivo Final: " + imgdet);
            fs.readFile('./public/uploads/' + imagem, function(err, src) {
                if (err) {
                  throw err;
                }
                var img = new Image();
                img.src = src;
                //console.log("Caminho: "+ src);
                var canvas = new Canvas(img.width, img.height);
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height);
                console.log(OCRAD(canvas));
                count = OCRAD(canvas);  
                        
                res.send({
                    resultOCR: count,
                    contChar: count.length
                });
            })
        }
      })
    })
};