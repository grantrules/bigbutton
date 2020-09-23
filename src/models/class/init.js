import { DataTypes } from 'sequelize';
import Student from '../student/student';
import Button from '../button/button';
import ClassModel from './class';

export default (sequelize) => {
  ClassModel.init({
    id: sequelize.idType,
    name: { type: DataTypes.TEXT },
    code: { type: DataTypes.TEXT },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Class', // We need to choose the model name
  });
  ClassModel.hasMany(Student);
  ClassModel.hasMany(Button);
};
