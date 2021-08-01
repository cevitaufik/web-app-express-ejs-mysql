const express = require('express');
const path = require('path');
const multer = require('multer');
const con = require('./db_config');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

const host = 3000;
const init = () => {
  app.listen(host);
  console.log(`server berjalan pada http://localhost:${host}`);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() +
    path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});
const uploadMultiple = upload.fields([
  {name: 'file1', maxCount: 10},
  {name: 'file2', maxCount: 10},
]);

app.get('/', (req, res) => {
  con.query( 'SELECT * FROM products; SELECT * FROM owner',
      (err, results) => {
        res.render('index.ejs', {db: results});
      },
  );
});

init();