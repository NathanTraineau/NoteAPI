/**
 * Authenticate policy
 */

module.exports = async function (req, res, proceed) {

  try{
    req.user =
    await sails.helpers.authenticate.jwt(req, res);

    return proceed();
  }catch(err){

    switch(err.code){

      case 'unauthorized' :
        return res.unauthorized();
      case 'forbidden' :
        return res.forbidden();
      case 'methodNotAllowed' :
        return res.methodNotAllowed();
      case 'badRequest' :
        return res.badRequest();
      case 'notFound' :
        return res.notFound();
      default:
        return res.serverError(err);

    }

  }
};
