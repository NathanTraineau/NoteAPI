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
  exits: {

    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
    },
    badRequest: {
      description: 'Bad request, error from the client',
    },

    notFound: {
      description: 'Resource not found',
    },

    methodNotAllowed: {
      description: 'Method not allowed',
    },
    error: {
      description: 'Internal server error from create folder',
      responseType: 'serverError'
    }

  },
  fn: function ({req}, exits) {
    const bearerHeader = req.headers['authorization'] || req.body.token || req.query.token;
    console.log('bearerHeader ' + JSON.stringify(bearerHeader))
    console.log('header ' + JSON.stringify(req.headers))
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
    }else{
      return exits.badRequest();
    }

    try {
      console.log('jwtconfig.secret'+jwtconfig.secret);
      const user = jwt.verify(req.token, jwtconfig.secret);
      if(!user){
        return exits.unauthorized();
      }
      return exits.success(user);
    } catch (err) {
      return exits.error(err);
    }
  }

};
