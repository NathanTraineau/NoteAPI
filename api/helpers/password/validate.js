const bcrypt = require('bcrypt');

module.exports = {

  inputs: {
    password: {
      type: 'string',
      required: true
    },
    hash: {
      type: 'string',
      required: true
    },
  },
  fn: function (inputs, exits) {

    bcrypt.compare(inputs.password, inputs.hash, (error, match) => {
      if(error)  { return exits.error(error); }
      return exits.success(match);
    });

  }
};
