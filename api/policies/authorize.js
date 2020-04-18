/**
 * Pharmacist policy
 *
 */

module.exports = async function (req, res, proceed) {

  const url = req.url.split(/(?=[A-Z])/);
  const model = url[1];
  const id = req.params.id || req.body.id || req.id;
  try {

    req.object = await sails.helpers.acl.authorize(model, id, req);
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
        return res.badRequest(err);
      case 'notFound' :
        return res.notFound();
      default:
        return res.serverError(err);

    }

  }

};
