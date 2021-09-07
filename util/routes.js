const con = require('./db_config');
const {nanoid} = require('nanoid');
const multer = require('multer');
const path = require('path');
const {sendMail, sendMailConfirm} = require('./send_email');

exports.home = (req, res) => {
  con.query( 'SELECT * FROM products; SELECT * FROM owner',
      (err, data) => {
        res.render('home', {
          data,
          layout: 'main-layout',
          tittle: 'Little-f',
          meta: data[0],
        });
      },
  );
};

exports.login = (req, res) => {
  res.render('login', {
    layout: 'main-layout',
    tittle: 'Login | Little-f',
  });
};

exports.auth = (req, res) => {
  con.query(
      'SELECT * FROM user WHERE email = ?',
      [req.body.email],
      (err, results) => {
        if (results.length > 0) {
          if (req.body.password === results[0].password) {
            req.session.userId = results[0].id;
            req.session.username = results[0].username;
            res.redirect('/');
          } else {
            res.redirect('/login');
          }
        } else {
          res.redirect('/login');
        }
      },
  );
};

exports.logout = (req, res) => {
  // eslint-disable-next-line arrow-parens
  req.session.destroy(err => {
    res.redirect('/');
  });
};

exports.add = (req, res) => {
  res.render('add', {
    layout: 'main-layout',
    tittle: 'Tambah produk | Little-f',
  });
  productCode.push(nanoid(5));
};

// upload handler
const productCode = [];
const fileName = [];
let imgIndex = 0;
const destination = 'uploads';

const imgName = () => {
  const name = productCode[0] + imgIndex++;
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

// formating input user like array
const toArray = (data) => {
  const str = data.replace(/,/g, '","');
  const desc = '["' + str + '"]';
  return desc;
};

// formating input user. product name
const uppercase = (data) => data.toUpperCase().slice(0, 1) + data.slice(1);


// add new product
exports.addNewProduct = (req, res) => {
  const productName = '[' + '"' + fileName[0] + '"' + ',' +
   '"' + fileName[1] + '"' + ',' + '"' + fileName[2] + '"' + ']';

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
        productCode[0],
        uppercase(req.body.name),
        req.body.price,
        toArray(req.body.description),
        req.body.category,
        req.body.bestProduct,
        productName,
        req.body.shopee,
        req.body.tokopedia,
      ],
      (err, results) => {
        res.redirect('/add');
        if (err != 'null') {
          console.log('data berhasil disimpan');
          fileName.splice(0, 3);
          productCode.splice(0, 1);
        } else {
          console.log(err);
        }
      },
  );
};

// update product, get data
exports.update = (req, res) => {
  con.query(
      'SELECT * FROM products WHERE id=?',
      req.params.id,
      (err, product) => {
        res.render('update', {
          layout: 'main-layout',
          tittle: 'Perbaharui produk | Little-f',
          product,
        });
      });
};

exports.updateById = (req, res) => {
  con.query(
      `UPDATE products SET 
      name = ?,
      price = ?,
      category = ?,
      description = ?,
      bestProduct = ?,
      shopee = ?,
      tokopedia = ?
      WHERE id = ?`,
      [
        uppercase(req.body.name),
        req.body.price,
        req.body.category,
        toArray(req.body.description),
        req.body.bestProduct,
        req.body.shopee,
        req.body.tokopedia,
        req.body.id,
      ],
      (err, results) => {
        res.redirect('/');
        console.log(err);
        console.log(results);
      },
  );
};

exports.deleteById = (req, res) => {
  con.query(
      'DELETE FROM products WHERE id = ?',
      [req.params.id],
      (err, results) => {
        res.redirect('/');
        console.log(err);
        console.log(results);
      },
  );
};

exports.sendMail = (req, res) => {
  sendMail(req.body.name, req.body.subject, req.body.email, req.body.text);
  sendMailConfirm(req.body.name, req.body.subject, req.body.email);

  res.redirect('/');
  console.log(req.body.email);
  console.log(req.body.text);
};

exports.productPage = (req, res) => {
  con.query(`SELECT * FROM products WHERE id = ?`,
      [req.params.id],
      (err, db) => {
        res.render('product-page', {
          layout: 'main-layout',
          tittle: db[0].name,
          product: db[0],
          meta: db,
        });
      },
  );
};