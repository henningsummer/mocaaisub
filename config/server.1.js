const express = require ('express');
const consign = require('consign');
const bodyParser =require('body-parser');
const expressValidator = require('express-validator');
const multer = require ('multer');
const ejs = require ('ejs');
const path = require('path');
const cv = require('opencv');

const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');


// Public Folder
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

consign()
    .include('config/dbConnection.js')
    .include('app/routes')
    .include('app/models')
    .include('app/controllers')
    .into(app);

//app.get('/', (req, res) => res.render('index'));


const storage = multer.diskStorage({
    destination: './public/uploads/',
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
});
//

const upload = multer({
    storage: storage,
    limits: { fileSize: 6000000},
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
    } 
    else {
        cb('Error: Images Only!');
    }
}



// na rota com limite de 10 arquivos
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        // var a = req.file.length;
        var imgdet;
        var count;
        var nfaces = [];
    
        // if(req.file){
    
         // }else{
        //     imgdet = undefined;
        // }
              
        if (err) {
            res.send({
                msg: err
            });
        } 
        else {

            if (req.file == undefined){
               res.send({
                   msg: `Nenhum Arquivo Enviado`,
                });
            } else {

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
                            nfaces[i] = (face.width +'-'+face.height +'-'+ (face.x+280)+'-'+(face.y+460));
                            count = i;
                        }

                        console.log(i);
                        console.log(nfaces);
                        
                        im.save('./public/uploads/face-detection.png');
                        console.log('Image saved to ./public/uploads/face-detection.png');
                    });

                    console.log(imgdet);
                    var igm = `./public/uploads/face-detection.png`;
                    console.log(igm);
                    
                    res.send({
                      msg: `Arquivo Enviados`,
                      file: `uploads/face-detection.png`,
                      //qtdface: `30`,
                    });
                }); 
            }
        }
    });
});

module.exports = app;