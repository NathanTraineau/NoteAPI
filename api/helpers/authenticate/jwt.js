/**
 * JWT authentication helper
 */

let jwt = require('jsonwebtoken');
const jwtconfig = sails.config.authentication.jwt;


module.exports = {

  inputs: {
    req: {
      type: 'ref',
      required: true
    },
    res: {
      type: 'ref',
      required: true,
    },

  },
  fn: function ({req}, exits) {
    console.log(jwtconfig.secret)
    const bearerHeader = req.headers['authorization'] || req.body.token || req.query.token;

    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
    }else{
      return exits.error(error);
    }

    try {
      const user = jwt.verify(req.token, jwtconfig.secret);
      return exits.success(user);
    } catch (error) {
      return exits.error(error);
    }
  }

};
