/**
 * Register user controller
 *
 * Dossier (id, titre, type (to-do, jardin, doss), dossier parent, author, liste personnes qui y ont accès)
 */


module.exports = {
  inputs: {

    title: {
      type: 'string',
      required: true,
      maxLength: 100,
      example: 'Jean'
    },
    parent: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: '67Gyhkkuhfjtgf768'
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
    unauthorized: {
      description: 'Unauthorized access, missing or invalid authorization access',
      responseType: 'unauthorized'
    },
    error: {
      description: 'Internal server error',
      responseType: 'serverError'
    }
  },
  fn: async function ({title, parent}, exits) {
    let { user } = this.req;
    let folderItem = await Folder.findOne({id: parent});

    if(!folderItem) {
      // If the type doesn't exist create one
      exits.badRequest();
    }

    if( folderItem.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
      exits.unauthorized();
    }

    const payload = {
      title,
      parent,
      author: user.id,
      accessibleBy : user.id
    };

    let newTodo =
          await Todo
          .create({...payload})
          .fetch();

    let todo =
        await Todo
          .findOne({id: newTodo.id})
          .populate('parent')
          .populate('author')
          .populate('accessibleBy');

    exits.success(todo);

  }
};
