/**
 * Register user controller
 *
 * Dossier (id, titre, type (to-do, jardin, doss), dossier parent, author, liste personnes qui y ont accès)
 */


module.exports = {
  inputs: {

    id: {
      type: 'string',
      required: true,
      maxLength: 100,
    },
    title: {
      type: 'string',
      maxLength: 100,
      example: 'Jean'
    },
    hashtags: {
      type:'json'
    },
    color: {
      type:'string',
      maxLength: 50,
      example: '67Gyhkkuhfjtgf768'
    },
    password: {
      type: 'string',
      example: 'Pa$$Ex@mple1234'
    },
    oldPassword: {
      type: 'string',
      example: 'Pa$$Ex@mple1234'
    },
    newPassword: {
      type: 'string',
      example: 'Pa$$Ex@mple1234'
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
    },
    forbidden: {
      description: 'Forbidden access, user rights are insufficient',
      responseType: 'forbidden'
    },
  },
  fn: async function (inputs, exits) {

    const { user } = this.req;

    let folderItem = await Folder.findOne({
      where: { id: inputs.id, accessibleBy: user.id }
    });

    let updatedFolder;

    if (!folderItem){
      exits.badRequest();
    }

    if( folderItem.accessibleBy !== this.req.user.id){ //A modifier pour que ca prenne une array de personnes
      exits.unauthorized();
    }

    if(folderItem.isSecured){
      if(!inputs.password) {
        return exits.forbidden();
      }
      let match =
        await sails.helpers.password
          .validate(inputs.password, folderItem.password);

      if (!match) {
        return exits.forbidden();
      }
    }

    if (inputs.newPassword || inputs.newPassword === '' ) {
      console.log(folderItem.isSecured)
      if(folderItem.isSecured){
        console.log('secured')
        if(!inputs.oldPassword) {
          return exits.forbidden();
        }

        let match =
          await sails.helpers.password
            .validate(inputs.oldPassword, folderItem.password);

        if (!match) {
          return exits.forbidden();
        }
      }

      const newPassword = inputs.newPassword;
      delete inputs.newPassword;
      delete inputs.oldPassword;
      updatedFolder = await Folder.updateOne({where: { id: inputs.id, accessibleBy: user.id }})
              .set({password : newPassword, isSecured : newPassword === '' ? false : true,  ...inputs})
              .intercept('*', 'serverError');
    }

    else {
      updatedFolder = await Folder.updateOne({where: { id: inputs.id, accessibleBy: user.id }})
              .set({...inputs})
              .intercept('*', 'serverError');
    }

    let folder =
            await Folder
              .findOne({id: updatedFolder.id})
              .populate('parent')
              .populate('author')
              .populate('accessibleBy');

    return exits.success(folder);
  }
};
