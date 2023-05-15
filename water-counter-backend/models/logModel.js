const { DataTypes } = require('sequelize');
const { sequelize } = require('../startup/dbConfig');
const { User } = require('./userModel');

const Log = sequelize.define(
  'Log',
  {
    log_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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

Log.belongsTo(User, { foreignKey: 'user_id' });

exports.Log = Log;
