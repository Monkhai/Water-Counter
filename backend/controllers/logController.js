const { User } = require('../models/userModel');
const { Log } = require('../models/logModel');
const { Op } = require('sequelize');
const { sequelize } = require('../startup/dbConfig');
const moment = require('moment-timezone');

// handles the POST for creating a new log
exports.newLog = async (req, res) => {
  const { amount } = req.body;
  const id = req.user.id;
  const user = await User.findOne({ where: id });
  if (!user) return res.status(400).json({ error: "can't find user" });

  await Log.create({
    user_id: id,
    amount,
  });

  res.status(201).send();
};

//handles GET for getting the daily amount for the last seven days (not including the current day)
exports.getWeeklyStats = async (req, res) => {
  //get timezone and user id from request
  const timezone = req.timezone;
  const id = req.user.id;

  // Calculate the last date for the last 7 days in the user's time zone format: YYYY-mm-ddT00:00:00.000Z
  const endDate = moment().tz(timezone).subtract(1, 'days').endOf('day').toDate();
  // Calculate the start date for the last 7 days in the user's time zone
  const startDate = moment().tz(timezone).subtract(7, 'days').startOf('day').toDate();

  // Convert the start and end dates to UTC format: 'Sun, 14 May 2023 03:59:59 GMT'
  const startUTC = startDate.toUTCString();
  const endUTC = endDate.toUTCString();

  // Query the logs
  const logs = await Log.findAll({
    //where to specify the conditions. If a log matches id AND is between startUTC and endUTC.
    where: {
      user_id: id,
      createdAt: {
        //Op stands for operator.
        [Op.between]: [startUTC, endUTC],
      },
    },
    //attributes are used to specify the data to get from the database for each log. In this case two attributes are used: date and totalAmount.
    attributes: [
      [
        // `CONVERT_TZ` is used to adjust the 'createdAt' timestamp from UTC to the user's timezone. This ensures that we group things by days with the user's tz
        // `DATE_FORMAT` is used to format this timestamp as a date string in 'YYYY-MM-DD' format.
        // The resulting date string is labelled as 'date' in the returned log objects.
        sequelize.literal(
          `DATE_FORMAT(CONVERT_TZ(createdAt, "+00:00", '${timezone}'), '%Y-%m-%d')`
        ),
        'date',
      ],
      // `sequelize.cast` converts 'amount' to an int.
      // sequelize.fn('SUM', ...)` used to sum up these integer amounts for all logs that match the conditions (including the group by which is written down later for some reason).
      // The total sum is labelled as 'totalAmount'.
      [sequelize.fn('SUM', sequelize.cast(sequelize.col('amount'), 'INTEGER')), 'totalAmount'],
    ],
    // again dates are converted to user's tz.
    // the group (GROUP BY in SQL) clause groups the attributes by the specified attribute, in this case, 'createdAt'.
    // it might seem like 'createdAt' is only being converted but that is just a function being applied to the chosen attribute. So "group by createdAt, but convert it first to the user's tz"
    group: [
      sequelize.literal(`DATE_FORMAT(CONVERT_TZ(createdAt, "+00:00", '${timezone}'), '%Y-%m-%d')`),
    ],
    //get raw sql data (a string object we jsonify later in the frontend instead of a model (which we don't have))
    raw: true,
  });

  // Generate an array of 7 dates starting from the start date
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });

  // Create a dateMap to store the total amount for each date
  const dateMap = new Map();

  // Initialize the date map with empty totalAmount values for each date
  dates.forEach((date) => {
    dateMap.set(date.toISOString().slice(0, 10), {
      date: date.toISOString().slice(0, 10),
      totalAmount: 0,
    });
  });

  // Update the totalAmount values in the date map based on the logs
  logs.forEach((log) => {
    const date = log.date;
    if (dateMap.has(date)) {
      const totalAmount = parseInt(log.totalAmount, 10);
      dateMap.get(date).totalAmount += totalAmount;
    }
  });
  // Convert the dateMap values to an array of 7 objects
  const weeklyStats = Array.from(dateMap.values());
  weeklyStats.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.status(200).json({ weeklyStats });
};

exports.getDailyAmount = async (req, res) => {
  const timezone = req.timezone;
  const id = req.user.id;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const startOfDayUTC = startOfDay.toISOString();
  const endOfDayUTC = endOfDay.toISOString();

  const dailyAmount = await Log.findAll({
    where: {
      user_id: id,
      createdAt: { [Op.between]: [startOfDayUTC, endOfDayUTC] },
    },
    attributes: [
      [
        sequelize.literal(
          `DATE_FORMAT(CONVERT_TZ(createdAt, "+00:00", '${timezone}'), '%Y-%m-%d')`
        ),
        'date',
      ],
      [sequelize.fn('SUM', sequelize.col('amount')), 'totalAmount'],
    ],
    group: [
      sequelize.literal(`DATE_FORMAT(CONVERT_TZ(createdAt, "+00:00", '${timezone}'), '%Y-%m-%d')`),
    ],
    raw: true,
  });

  res.json({ dailyAmount });
};
