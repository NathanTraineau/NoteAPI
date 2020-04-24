/**
 * Read idea controller
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
    password: {
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
    },
    notFound: {
      description: 'Resource not found',
      responseType: 'notFound'
    },
  },
  fn: async function (inputs, exits) {

    const { user } = this.req;
    console.log(inputs.id + user.id);
    let folder = await Folder.findOne({
      where: { id: inputs.id, accessibleBy: user.id }
    })
    .populate('parent')
    .populate('author')
    .populate('type')
    .populate('folderChildrens')
    .populate('noteChildrens')
    .populate('ideaChildrens')
    .populate('todoChildrens')
    .populate('accessibleBy');

    if(!folder){
      exits.notFound();
    }

    if(folder.isSecured){
      await sails.helpers.password.validate(inputs.password, folder.password)
      .exec((error, match) => {
        if (error || !match) {
          return exits.unauthorized();
        }
        delete folder.password;
      });
    }
    return exits.success(
        folder);
  }
};
