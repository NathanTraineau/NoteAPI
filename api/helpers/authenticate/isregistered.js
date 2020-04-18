module.exports = {

  inputs: {
    req: {
      type: 'ref',
      required: true
    },
    res: {
      type: 'ref',
      required: true,
    },

  },
  fn: async function ({req, res}, exits) {
    let user = await User.findOne({userID: req.user.userID});
    if(!user){
      try {
        await User
            .create(req.user)
            .fetch();
        let newUser = await User.findOne({userID: req.user.userID});
        return exits.success(newUser);
      }
      catch (error) {
        return exits.error(error);
      }
    }else{
      return exits.success(user);
    }

  }
};
