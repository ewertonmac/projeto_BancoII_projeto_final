const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {

  const auth = req.headers.authorization;

  if(!auth) {
    return res.status(401).send('Não autorizado');
  }

  const token = auth.split(' ');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if(err) return res.status(401).send('Não autorizado!');
  });

  

}