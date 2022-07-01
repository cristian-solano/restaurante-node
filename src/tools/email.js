const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
          user: "cristiansolano1941@gmail.com", //todo: deben ser una variable de entorno
          pass: "xjmniyecepgqaldc"
        }
});

module.exports = {
    transporter
}