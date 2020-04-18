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
    type: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'to-do, jardin, notes'
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
  fn: async function ({title, type, parent}, exits) {

    const { user } = this.req;

    if(parent){
      let folderItem = await Folder.findOne({id: parent});

      if(!folderItem) {
        // If the type doesn't exist create one
        exits.badRequest();
      }

      if( folderItem.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
        exits.unauthorized();
      }
    }

    let validType = await FolderType.findOne({title: type});

    if(!validType) {
    // If the type doesn't exist create one
      try {
        await FolderType
          .create({inputs})
          .fetch();
      }
      catch (err) {

        switch (err.message) {

          default:
            exits.error(err);

        }
      }
    }

    let folderType =
      await FolderType
        .findOne({title: type});

    const payload = {
      title: title,
      type: folderType.id,
      parent : parent,
      author: user.id,
      accessibleBy : user.id
    };

    let newFolder =
        await Folder
        .create({...payload})
        .fetch();

    let folder =
      await Folder
        .findOne({id: newFolder.id})
        .populate('type');

    exits.success(folder);


  }
};
