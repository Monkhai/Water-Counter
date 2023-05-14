const { User, validateLoginRequest, validateRegistrationRequest } = require('../models/userModel');
const bcrypt = require('bcrypt');
const { sequelize } = require('../startup/dbConfig');
const { defaultSettings } = require('./settingsController');

//registerUser function
exports.registerUser = async (req, res) => {
  //get data to save from req
  const { username, email, password } = req.body;

  //check if the request is valid
  const { error } = validateRegistrationRequest(req.body);
  if (error) {
    errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  //check if user does not already exist
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) return res.status(400).json({ message: 'Email already in use' });

  const validUsername = await User.findOne({ where: { username } });
  if (validUsername) return res.status(400).json({ message: 'Username already in use' });

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const newUser = await sequelize.transaction(async (transaction) => {
    const user = await User.create({ username, email, password: hashedPassword }, { transaction });
    const token = user.generateAuthToken();

    const settings = await defaultSettings(user.user_id, transaction);

    return { user, token, settings };
  });

  //respond with the created user
  res.status(201).json({
    user_id: newUser.user.user_id,
    username: newUser.user.username,
    email: newUser.user.email,
    jwt: newUser.token,
    defaultSettings: newUser.settings,
  });
};

exports.loginUser = async (req, res) => {
  const { error } = validateLoginRequest(req.body);
  if (error) {
    errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

  const token = user.generateAuthToken();

  res.status(200).json({ jwt: token });
};
