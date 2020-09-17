import { DataTypes } from 'sequelize';
import Teacher from '../teacher/teacher';
import ClassModel from './student';

export default (sequelize) => {
  ClassModel.init({
    id: sequelize.idType,
    name: { type: DataTypes.TEXT },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Class', // We need to choose the model name
  });
  ClassModel.belongsTo(Teacher);
};
