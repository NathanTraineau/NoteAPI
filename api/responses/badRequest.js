/**
 * 400 (Bad request) http code
 */
module.exports = function badRequest(payload = 'Bad request from the client') {

  let res = this.res;

  res.status(400);

  payload = payload || {};

  res.json({
    error: payload.code,
    problems: payload.problems,
    message: typeof payload === 'string' ? payload : undefined,
  });

  res.end();

};
