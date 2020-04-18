module.exports = {

  inputs: {

    resource: {
      type: 'string',
      required: true
    },
    resourceId: {
      type: 'string',
      allowNull: true
    },
    req: {
      type: 'ref',
      required: true
    }

  },
  exits: {

    success: {
      description: 'Allow access on the resource',
    },

    unauthorized: {
      description: 'Insufficient rights on the resource',
    },

    forbidden: {
      description: 'Forbidden access on resource',
    },

    badRequest: {
      description: 'Bad request from the client',
    },

    notFound: {
      description: 'Resource not found',
    },

    methodNotAllowed: {
      description: 'Method not allowed',
    }

  },
  fn: async function (inputs, exits) {

    const {acl} = sails.config;
    const {resource, resourceId, req} = inputs;
    let object = await resource.findOne({id: resourceId});

    if (!object){
      console.log('hhhhhh');
      exits.badRequest();
    }

    if( object.accessibleBy !== this.req.user.id){ //A modifier pour que ca prennenune array de personnes
      exits.unauthorized();
    }

    exits.success(object);

  }
};
