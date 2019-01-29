// Referências para os módulos utilizados nesse arquivo -> Require node_modules
const express = require ('express'); //Framework Express
const consign = require('consign'); //Assinador de acesso as pastas e arquivos da aplicação
const bodyParser = require('body-parser'); //Encoded para o padrão de HTML
const expressValidator = require('express-validator');
const ejs = require ('ejs');
const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');


// Pasta Pública - > Public Folder
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

consign()
    .include('config/dbConnection.js')
    .include('app/routes')
    .include('app/models')
    .include('app/controllers')
    .into(app);

module.exports = app;