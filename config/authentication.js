/**
 * Authentication configuration
 */

module.exports.authentication = {

  jwt: {

    // Overridden
    secret: 'jfb67GUpGmrezHKuh',

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
