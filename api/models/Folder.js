/**
 * Folders.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    title: {
      type: 'string',
      required: true,
      maxLength: 100,
      example: 'Jean'
    },
    isSecured: {
      type: 'boolean',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    folderChildrens: {
      collection: 'folder',
      via: 'parent'
    },
    noteChildrens: {
      collection: 'note',
      via: 'parent'
    },
    ideaChildrens: {
      collection: 'idea',
      via: 'parent'
    },
    todoChildrens: {
      collection: 'todo',
      via: 'parent'
    },
    parent:{
      model: 'folder'
    },
    type:{
      model: 'folderType'
    },
    author: {
      model: 'user',
    },
    accessibleBy: {
      model: 'user',
    },

  },
  beforeCreate: async function(payload, proceed) {

    if(payload.password){
      payload.password = await sails.helpers.password.hash(payload.password);
      payload.isSecured = true;
    }else{
      payload.isSecured = false;
    }

    return proceed();

  },
  beforeUpdate: async function(payload, proceed) {

    if(payload.password){
      payload.password = await sails.helpers.password.hash(payload.password);
    }

    return proceed();

  }
};

