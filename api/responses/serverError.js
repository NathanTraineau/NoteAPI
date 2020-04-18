/**
 * 500 (Internal server error) http code
 */
module.exports = function internalServerError(err) {

  let req = this.req;
  let res = this.res;

  let sails = req._sails;

  sails.log.error('Internal server error (code ' + err.code  + '): ' + err.message);

  res.status(500);

  res.end();


};
