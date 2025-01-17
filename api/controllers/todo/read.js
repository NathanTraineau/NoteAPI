/**
 * Read idea controller
 *
 * Dossier (id, titre, type (to-do, jardin, doss), dossier parent, author, liste personnes qui y ont accès)
 */

module.exports = {
  inputs: {

    id: {
      type: 'string',
      maxLength: 100,
    },
    parent: {
      type: 'string',
      maxLength: 50,
      example: '67Gyhkkuhfjtgf768'
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

    let { user } = this.req;

    let todos = await Todo.find({
      where: { id: inputs.id, accessibleBy: user.id, parent: inputs.parent },
      sort: 'updatedAt DESC'
    })
                .intercept('*', 'serverError');

    return exits.success(todos);

  }
};
