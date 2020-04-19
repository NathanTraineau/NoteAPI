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
    },
    hashtags: {
      type:'json'
    },
    color: {
      type:'string',
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

    let folderItem = await Folder.findOne({id: this.req.id});

    if (!folderItem){
      exits.badRequest();
    }

    if( folderItem.accessibleBy !== this.req.user.id){ //A modifier pour que ca prenne une array de personnes
      exits.unauthorized();
    }
    let updatedFolder = await Idea.updateFolder({id: this.req.id})
              .set(inputs)
              .intercept('*', 'serverError');

    let folder =
            await Folder
              .findOne({id: updatedFolder.id})
              .populate('parent')
              .populate('author')
              .populate('accessibleBy');

    return exits.success(folder);
  }
};
