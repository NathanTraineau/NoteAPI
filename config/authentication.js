/**
 * Authentication configuration
 */
var dotenv = require('dotenv');


module.exports.authentication = {

  jwt: {

    // Overridden
    secret: process.env.ACCESS_SECRET_API_SINGE,
    
    options: {
      audience: 'api',
      algorithm: 'HS256'
    },

    strategy: function (payload, next) {
      
      if (!payload || !payload.account.userID) {
        return next();
      }

      User
          .findOne({id: payload.userID})
          .exec(async (err, account) => {

            if (err || !account) {return next(err);}
            next(null, account);

          });
    }

  }

};
