const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const routes = require('./util/routes');
const path = require('path');
const bp = require('body-parser');

const app = express();

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));

const host = 3000;
const init = () => {
  app.listen(host);
  console.log(`server berjalan pada http://localhost:${host}`);
};

app.get('/', routes.home);
app.get('/add', routes.add);
app.post('/add', routes.uploadMultiple, routes.addNewProduct);
app.get('/update/:id', routes.update);
app.post('/update', routes.updateById);
app.post('/delete/:id', routes.deleteById);

init();