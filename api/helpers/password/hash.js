/**
 * Bcrypt helper
 */

let bcrypt = require('bcrypt');

module.exports = {

  inputs: {
    payload: {
      type: 'string',
      required: true
    }
  },
  fn: function (inputs, exits) {

    const saltRounds = 10;

    bcrypt.hash(inputs.payload, saltRounds, (err, hash) => {

      if(err){ return exits.error(err); }
      return exits.success(hash);

    });

  }

};
