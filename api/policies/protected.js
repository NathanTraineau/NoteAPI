/**
 * Restrict access policy
 */

module.exports = async function (req, res, proceed) {
  console.log(JSON.stringify(req.user));
  if(!req.user) { return res.unauthorized(); }

  return proceed();

};
