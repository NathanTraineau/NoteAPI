/**
 * Restrict access policy
 */

module.exports = async function (req, res, proceed) {
  if(!req.user) { return res.unauthorized(); }

  return proceed();

};
