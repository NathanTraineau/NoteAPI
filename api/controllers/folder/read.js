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
    type: {
      type: 'string',
      maxLength: 50,
      example: 'to-do, jardin, notes'
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
    let validType;
    
    if(inputs.type){
      validType = await FolderType.findOne({title: inputs.type});
    }


    let folder = await Folder.find({
      where: { id: inputs.id, accessibleBy: user.id, parent: inputs.parent, type: validType ? validType.id : inputs.type },
      sort: 'updatedAt DESC'
    })
    .intercept('*', 'serverError');

    return exits.success(folder);

  }
};
