const { sequelize } = require('../config/db');
const User = require('./User');

// Initialize models
const models = {
    User: User.init(sequelize),
};

// Establish associations if any
// Object.values(models)
//   .filter(model => typeof model.associate === 'function')
//   .forEach(model => model.associate(models));

module.exports = {
    ...models,
    sequelize
};