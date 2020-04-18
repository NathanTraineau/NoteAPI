/**
 * 404 (Not found) http code
 */
module.exports = function notFound(payload = 'Not found') {

  let res = this.res;

  res.status(404);

  payload = payload || {};

  res.json({
    error: payload.code,
    problems: payload.problems,
    message: typeof payload === 'string' ? payload : payload.message
  });

  res.end();

};
