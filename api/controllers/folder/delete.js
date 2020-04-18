/**
 * Account delete controller
 */

module.exports = {

  exits: {

    success: {
      description: 'Account resource successfully deleted',
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    forbidden: {
      description: 'Forbidden access, user rights are insufficient',
      responseType: 'forbidden'
    },
    badRequest: {
      description: 'Bad request, error from the client',
      responseType: 'badRequest'
    },
    notFound: {
      description: 'Resource not found',
      responseType: 'notFound'
    },
    serverError: {
      description: 'Internal server error',
      responseType: 'serverError'
    },

  },

  fn: async function (inputs, exits) {

    let {account} = this.req;

    let folder = await Folder.findOne({id : inputs.id});

    if (!folder){
      exits.badRequest();
    }

    if (folder.author === account.id){
      await Folder.destroyOne({id: account.id})
        .intercept('*', 'serverError');
      return exits.unauthorized();
    }

    exits.error();
  }
};
