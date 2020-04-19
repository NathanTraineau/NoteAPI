/**
 * Folder delete controller
 */

module.exports = {

  inputs: {

    id: {
      type: 'string',
      maxLength: 100,
    },
  },
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

    let {user} = this.req;

    let folder = await Folder.findOne({id : inputs.id});

    if (!folder){
      exits.badRequest();
    }

    if (folder.author === user.id){
      await Folder.destroy({parent: inputs.id});
      await Note.destroy({parent: inputs.id});
      await Idea.destroy({parent: inputs.id});
      await Todo.destroy({parent: inputs.id});

      await Folder.destroyOne({id: inputs.id})
        .intercept('*', 'serverError');
      exits.success();
    }
    else{
      exits.unauthorized();
    }

  }
};
