const Sequelize = require('sequelize');
const logger = require('../startup/logging');

const sequelize = new Sequelize('HydrationTracker', 'root', 'yohaiwiener', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});
function initiateConnection() {
  sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
  });
}

exports.sequelize = sequelize;
exports.initiateConnection = initiateConnection;
