const { Resend } = require('resend');

// Ne charge dotenv que en local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = {
  resend
};