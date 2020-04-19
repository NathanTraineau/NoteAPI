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
    const bearerHeader = req.headers['authorization'] || req.body.token || req.query.token;
    console.log('bearerHeader' + bearerHeader)
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
    }else{
      return exits.error(error);
    }

    try {
      console.log('jwtconfig.secret'+jwtconfig.secret);
      const user = jwt.verify(req.token, jwtconfig.secret);
      return exits.success(user);
    } catch (error) {
      return exits.error(error);
    }
  }

};
