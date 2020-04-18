/**
 * Register user controller
 */


module.exports = {
  inputs: {
    userID: {
      type: 'number',
      required: true,
      example: 5
    },
    username: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'Jean'
    },
    firstName: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'Jean'
    },
    lastName: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'Dupont'
    },
    role: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'Dupont'
    },

  },
  exits: {
    success: {
      description: 'Account successfully registered',
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    error: {
      description: 'Internal server error',
      responseType: 'serverError'
    }
  },
  fn: async function (inputs, exits) {

    try {

      await User
        .create(inputs)
        .fetch();

      exits.success();

    }
    catch (err) {

      switch (err.message) {

        default:
          exits.error(err);

      }

    }

  }
};
