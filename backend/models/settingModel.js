const { DataTypes } = require('sequelize');
const { sequelize } = require('../startup/dbConfig');
const { User } = require('./userModel');

const Setting = sequelize.define(
  'Setting',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Setting.belongsTo(User, { foreignKey: 'user_id' });

exports.Setting = Setting;
