/**
 * 403 (Forbidden) http code
 */
module.exports = function forbidden(payload = 'Forbidden access') {

  let res = this.res;

  res.status(403);

  payload = payload || {};

  res.json({
    error: payload.code,
    problems: payload.problems,
    message: typeof payload === 'string' ? payload : payload.message
  });

  res.end();

};
