import { DataTypes } from 'sequelize';
import ButtonModel from './button';

export default (sequelize) => {
  ButtonModel.init({
    id: sequelize.idType,
    color: { type: DataTypes.TEXT },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Button', // We need to choose the model name
  });
};
