import { DataTypes } from 'sequelize';
import { hash } from '../../utils/hash';
import TeacherModel from './teacher';
import Class from '../class/class';

export default (sequelize) => {
  TeacherModel.init({

    id: sequelize.idType,
    name: { type: DataTypes.TEXT },
    email: { type: DataTypes.TEXT, unique: true },
    school: { type: DataTypes.TEXT },
    passwordHash: { type: DataTypes.TEXT },
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Teacher', // We need to choose the model name
  });
  TeacherModel.hasMany(Class, { as: 'classes', foreignKey: 'fk_teacher_id' });
  Class.belongsTo(TeacherModel, { foreignKey: 'fk_teacher_id' });

  hash('doink')
    .then((h) => TeacherModel.create({
      email: 'gharding@gmail.com',
      passwordHash: h,
      school: 'NEB',
      name: 'Grant',
    })).catch(() => { /* unique error prob */ });
};
