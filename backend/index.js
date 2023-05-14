const logger = require('./startup/logging');
const { initiateConnection } = require('./startup/dbConfig');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

initiateConnection();
require('./startup/routes')(app);
require('./startup/validation')();

app.listen(port, () => {
  logger.info(`Hydration Tracker API listening at http://localhost:${port}`);
});
