/**
 * Regex configuration
 */

module.exports.regex = {

  date: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[*@!#%&()[\]^~\\|?='"{}/_-]).{8,}$/,
  professionalId: /^(([0-9]{10}[A-z])|([0-9]{9}[A-z]{2})|([0-9]{11}))$/,
  postalCode: /^[0-9]{5}$/

};