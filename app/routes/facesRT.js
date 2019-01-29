const multer = require ('multer');
const path = require('path');
const cv = require('opencv');
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
        const filetypes = /jpeg|jpg|png|gif/;
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
    
    mocai.post("/upload", (req, res) => {
        upload(req, res, (err) => {
    
            var imgdet;
            var count;
            var nfaces = [];
    
    
    
            if(req.file){
                console.log("Imagem: " + req.file.path);
                imgdet = './'+req.file.path.replace(/[\\"]/g, '/');
                var COLOR = [0, 255, 0]; // default red
                var thickness = 2; // default 1
            
                cv.readImage(imgdet, function(err, im) {
                    if (err) throw err;
                    if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
    
                    im.detectObject('./node_modules/opencv/data/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
                        if (err) throw err;
    
                        for (var i = 0; i < faces.length; i++) {
                            var face = faces[i];
                            im.rectangle([face.x, face.y], [face.width, face.height], COLOR, 2);
                        
                            nfaces[i] = (face.x +'-'+face.y +'-'+ face.width+'-'+face.height);
                            count = i;
                        }
                        console.log(i);
                        console.log(nfaces);
                        console.log(imgdet);
                    
                        im.save(imgdet);
                        console.log('Image saved to '+ imgdet);
                    
                        res.send({
                            msg: `Arquivo Enviados`,
                            file: `uploads/${req.file.filename}`,
                            qtdface: count+1,
                            arrface: [nfaces],
                        
                        });
                    });                           
                }); 
            }
            else{
                imgdet = undefined;
            }
    
            if (err) {
                    res.send({
                        msg: err
                    });
            }
            else{
    
                if(req.file == undefined){
                    res.send({
                        msg: `Nenhum Arquivo Enviado`,
                    });
                }
                else{
    
                }
            }
        });
    });
};