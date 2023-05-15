const moment = require('moment-timezone');

module.exports = function (req, res, next) {
  const timezone = req.header('x-user-timezone');
  if (!timezone) return res.status(401).send('Access denied.');
  if (!isValidTZ(timezone)) return res.status(400).send('Invalid timezone');
  req.timezone = timezone;
  next();
};

function isValidTZ(timezone) {
  return moment.tz.zone(timezone) !== null;
}
