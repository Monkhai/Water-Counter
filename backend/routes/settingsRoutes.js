const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.put('/update_settings', auth, settingsController.updateSettings);
router.get('/get_settings', auth, settingsController.getSettings);

module.exports = router;
