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
    title: {
      type: 'string',
      maxLength: 100,
      example: 'Jean'
    }


  },
  exits: {
    success: {
      description: 'Account successfully registered',
    },
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
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

    let isTodoUpdatable = await Todo.findOne({id: inputs.id});

    if (!isTodoUpdatable){
      exits.badRequest();
    }

    if( isTodoUpdatable.accessibleBy !== this.req.user.id){ //A modifier pour que ca prenne une array de personnes
      exits.unauthorized();
    }
    let updatedTodo = await Todo.updateOne({id: inputs.id})
            .set(inputs)
            .intercept('*', 'serverError');

    let todo =
          await Todo
            .findOne({id: updatedTodo.id})
            .populate('parent')
            .populate('author')
            .populate('accessibleBy');

    return exits.success(todo);

  }
};
