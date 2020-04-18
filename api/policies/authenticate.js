/**
 * Authenticate policy
 */

module.exports = async function (req, res, proceed) {

  req.user =
    await sails.helpers.authenticate.jwt(req, res)
      .intercept('*', (err) => res.serverError(err));

  return proceed();

};
