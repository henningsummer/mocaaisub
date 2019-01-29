//Pegando as variáves utilizadas na solicitação do módulo do NodeJS

const express = require('express'); //VARIÁVEIS APONTANDO PARA A PASTA NODE_MODULES E COLETANDO SEUS MÓDULOS
const multer = require('multer'); //QUE SÃO FUNÇÕES, AÇÕES ENTRE OUTROS QUE PODEM SER ACESSADOS PELA VARIÁVEL
const ejs = require('ejs'); //QUE RECEBE TODO A REFERÊNCIA (APONTANDO) PARA OS DIVERSOS PROCEDIMENTOS E 
const path = require('path'); // RECURSOS DOS SEUS RESPECTIVOS MÓDULOS.
const msg = require('./modtest');

//Acessar e usar um módulo para ENVIO DE ARQUIVOS através do protoco HTTP.


//Indicar o Engine de Armazenamento
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 4000000, files: 10 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));


app.post('/upload', (req, res) => {
    
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Nenhum Arquivo Selecionado!'
                });
            } else {
                res.render('index', {
                    
                    msg: 'Arquivo(s) Enviados' + req.file.filename,
                    file: `uploads/${req.file.filename}`,
                    
                });
                console.log('files', req.file);
            }
        }
    });
    
});


const port = 3035;

app.listen(port, () => console.log(`Server started on port ${port} ${msg(7)}`));