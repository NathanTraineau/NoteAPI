/**
 * 404 (Method not allowed) http code
 */
module.exports = function methodNotAllowed(payload = 'Method not allowed on this endpoint') {

  let res = this.res;

  res.status(405);

  payload = payload || {};

  res.json({
    error: payload.code,
    problems: payload.problems,
    message: typeof payload === 'string' ? payload : payload.message
  });

  res.end();

};
