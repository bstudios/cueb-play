import { Sequelize, DataTypes } from 'sequelize';

export const Setting = (database: Sequelize) => {
  return database.define('Setting', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.STRING,      
      defaultValue: ""
      // allowNull defaults to true
    }
  }, {
    timestamps: true
  });
}