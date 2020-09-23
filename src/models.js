const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:example@postgres:5432/bigbutton'); // Example for postgres

/* Change to true to update the model in the database. */
/* NOTE: This being set to true will erase your data. */
if (process.env.NODE_ENV !== 'test') {
  sequelize.sync({ force: false });
}

/* Create standard id type for our database */
sequelize.idType = {
  primaryKey: true,
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
};

sequelize.autoIncType = {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  primaryKey: true,
};

/* Import and create all models. */
require('./models/student/init').default(sequelize);
require('./models/button/init').default(sequelize);

require('./models/class/init').default(sequelize);

require('./models/teacher/init').default(sequelize);

module.exports = sequelize;
