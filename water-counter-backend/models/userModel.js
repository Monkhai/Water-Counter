const { DataTypes } = require('sequelize');
const { sequelize } = require('../startup/dbConfig');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = sequelize.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
User.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.user_id }, config.get('jwtPrivateKey'));
  if (!token) {
    throw new Error('Error generating auth token');
  }
  return token;
};

function validateLoginRequest(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email().messages({
      'any.required': 'Email is a required field',
      'string.empty': 'Email should have a minimum of 5 characters',
      'string.min': 'Email should have a minimum of 5 characters',
      'string.max': 'Email should have a maximum of 55 characters',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().min(5).max(255).required().messages({
      'any.required': 'Password is a required field',
      'string.empty': 'Password should have a minimum of 5 characters',
      'string.min': 'Password should have a minimum of 5 characters',
      'string.max': 'Password should have a maximum of 255 characters',
    }),
  });
  return schema.validate(user);
}

function validateRegistrationRequest(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(50).required().email().messages({
      'any.required': 'Email is a required field',
      'string.empty': 'Email should have a minimum of 5 characters',
      'string.min': 'Email should have a minimum of 5 characters',
      'string.max': 'Email should have a maximum of 55 characters',
      'string.email': 'Email must be a valid email',
    }),
    username: Joi.string().min(5).max(255).required().messages({
      'any.required': 'username is a required field',
      'string.empty': 'username should have a minimum of 5 characters',
      'string.min': 'username should have a minimum of 5 characters',
      'string.max': 'username should have a maximum of 55 characters',
    }),
    password: Joi.string().min(5).max(255).required().messages({
      'any.required': 'Password is a required field',
      'string.empty': 'Password should have a minimum of 5 characters',
      'string.min': 'Password should have a minimum of 5 characters',
      'string.max': 'Password should have a maximum of 255 characters',
    }),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validateLoginRequest = validateLoginRequest;
exports.validateRegistrationRequest = validateRegistrationRequest;
