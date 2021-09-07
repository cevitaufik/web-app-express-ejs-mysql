const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'mail.little-f.xyz',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'admin@little-f.xyz', // generated ethereal user
    pass: ']aZC,0wUXc?G', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendMail = (name, subject, email, text) => {
  const mailOptions = {
    sender: name,
    subject: subject,
    from: 'admin@little-f.xyz',
    to: 'admin@little-f.xyz',
    replyTo: email,
    text: `${name}, ${text}`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('succes');
    }
  });
};

const sendMailConfirm = (name, subject, email) => {
  const mailOptions = {
    sender: name,
    subject,
    from: 'admin@little-f.xyz',
    to: email,
    html: `<h4>Hi! ${name}</h4>
      <p>Terimakasih telah menghubungi kami</p>
      <p>Kami akan segera menghubungi kamu.</p><br>
      <a href="little-f.xyz">Little-f</a>`,
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('succes');
    }
  });
};

// Exporting the sendmail
module.exports = {sendMail, sendMailConfirm};

