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

    let isNoteUpdatable = await Note.findOne({id: inputs.id});

    if (!isNoteUpdatable){
      exits.badRequest();
    }

    if( isNoteUpdatable.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
      exits.unauthorized();
    }
    await Note.destroyOne({id: inputs.id})
              .intercept('*', 'serverError');

    return exits.success();

  }
};
