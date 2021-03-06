import { DataTypes } from 'sequelize';
import StudentModel from './student';

export default (sequelize) => {
  StudentModel.init({
    id: sequelize.idType,
    name: { type: DataTypes.TEXT },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Student', // We need to choose the model name
  });
};
