const { Setting } = require('../models/settingModel');

exports.updateSettings = async (req, res) => {
  const { amount } = req.body;
  const id = req.user.id;

  const setting = await Setting.findOne({ where: { user_id: id } });
  if (setting) {
    await Setting.update({ amount }, { where: { user_id: id } });
  } else {
    await Setting.create({ user_id: id, amount });
  }

  res.status(200).json({ message: 'setting updated!' });
};

exports.defaultSettings = async (user_id, transaction) => {
  const defaultSettings = await Setting.create({ user_id, amount: 200 }, { transaction });
  return defaultSettings;
};

exports.getSettings = async (req, res) => {
  const id = req.user.id;

  const setting = await Setting.findOne({ where: { user_id: id } });
  if (!setting) {
    const setting = await Setting.create({ user_id, amount: 200 });
    res.status(201).json({ setting });
  }
  res.status(200).json({ setting });
};
