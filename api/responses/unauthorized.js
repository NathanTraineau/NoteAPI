/**
 * 401 (Unauthorized) http code
 */
module.exports = function unauthorized(payload = 'Unauthorized access') {

  let res = this.res;

  res.status(401);

  payload = payload || {};

  res.json({
    error: payload.code,
    problems: payload.problems,
    message: typeof payload === 'string' ? payload : payload.message
  });

  res.end();

};
