/**
 * Register user controller
 *
 * Dossier (id, titre, type (to-do, jardin, doss), dossier parent, author, liste personnes qui y ont accès)
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
      description: 'Account successfully registered',
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    error: {
      description: 'Internal server error',
      responseType: 'serverError'
    }
  },
  fn: async function (inputs, exits) {

    let idea = await Idea.findOne({id: inputs.id});

    if (!idea){
      exits.badRequest();
    }

    if( idea.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
      exits.unauthorized();
    }
    await Idea.destroyOne({id: inputs.id})
              .intercept('*', 'serverError');

    return exits.success();

  }
};
