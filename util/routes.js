const con = require('./db_config');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');

exports.home = (req, res) => {
  con.query( 'SELECT * FROM products; SELECT * FROM owner',
      (err, results) => {
        res.render('home', {
          db: results,
          layout: 'main-layout',
          tittle: 'Little-f',
        });
      },
  );
};

exports.add = (req, res) => {
  res.render('add', {
    layout: 'main-layout',
    tittle: 'Tambah produk | Little-f',
  });
};

// upload handler
const productCode = nanoid(5);
const fileName = [];
let imgIndex = 0;
const destination = 'uploads';

const imgName = () => {
  const name = productCode + imgIndex++;
  fileName.push(destination + '/' + name + '.webp');
  return name;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/' + destination);
  },
  filename: (req, file, cb) => {
    cb(null, imgName() + path.extname(file.originalname));
  },
});

const upload = multer({storage: storage});
exports.uploadMultiple = upload.fields([
  {name: 'foto1', maxCount: 10},
  {name: 'foto2', maxCount: 10},
  {name: 'foto3', maxCount: 10},
]);

// add new product
exports.addNewProduct = (req, res) => {
  const uppercase = (data) => data.toUpperCase().slice(0, 1) + data.slice(1);
  const productName = '[' + '"' + fileName[0] + '"' + ',' +
   '"' + fileName[1] + '"' + ',' + '"' + fileName[2] + '"' + ']';

  const toArray = (data) => {
    const str = data.replace(/,/g, '","');
    const desc = '["' + str + '"]';
    return desc;
  };

  con.query(
      `INSERT INTO products (
          code,
          name,
          price,
          description, 
          category, 
          bestProduct,
          image,
          shopee, 
          tokopedia
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productCode,
        uppercase(req.body.name),
        req.body.price,
        toArray(req.body.description),
        req.body.category,
        req.body.bestProduct,
        productName,
        req.body.shopee,
        req.body.tokopedia,
      ],
      (error, results) => {
        res.redirect('/add');
        if (error != 'null') {
          console.log('data berhasil disimpan');
        } else {
          console.log(error);
        }
      },
  );
};