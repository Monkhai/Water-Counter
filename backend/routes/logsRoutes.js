const extractTZ = require('../middleware/extractTZ');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/new_log', auth, logController.newLog);
router.get('/get_weekly_stats', auth, extractTZ, logController.getWeeklyStats);
router.get('/get_daily_amount', auth, extractTZ, logController.getDailyAmount);

module.exports = router;
