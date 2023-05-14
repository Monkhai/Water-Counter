const express = require('express');
const cookieParser = require('cookie-parser');
const error = require('../middleware/error');
const logs = require('../routes/logsRoutes');
const users = require('../routes/userRoutes');
const settings = require('../routes/settingsRoutes');
const cors = require('cors');

module.exports = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({ origin: 'http://127.0.0.1:5500' }));
  app.use('/api/logs', logs);
  app.use('/api/users', users);
  app.use('/api/settings', settings);
  app.use(error);
};
