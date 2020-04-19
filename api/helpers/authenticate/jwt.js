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
      description: 'Unauthorized access, invalid authorization access',
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
    }

  },
  fn: function ({req}, exits) {
    const bearerHeader = req.headers['authorization'] || req.body.token || req.query.token;
    if (bearerHeader) {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
    }else{
      return exits.badRequest();
    }

    try {
      const user = jwt.verify(req.token, jwtconfig.secret);
      if(!user){
        return exits.unauthorized();
      }
      return exits.success(user);
    } catch (err) {
      return exits.unauthorized(err);
    }
  }

};
