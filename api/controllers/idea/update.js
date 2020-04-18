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
    },
    content: {
      type:'json'
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

    let ideaItem = await Idea.findOne({id: inputs.id});

    if (!ideaItem){
      exits.badRequest();
    }

    if( ideaItem.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
      exits.unauthorized();
    }
    let updatedIdea = await Idea.updateOne({id: inputs.id})
            .set(inputs)
            .intercept('*', 'serverError');

    let idea =
          await Idea
            .findOne({id: updatedIdea.id})
            .populate('parent')
            .populate('author')
            .populate('accessibleBy');

    return exits.success(idea);

  }
};
