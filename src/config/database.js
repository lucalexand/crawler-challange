require('dotenv').config();

module.exports = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || "./DB/coreDatabase.sqlite",
  operatorsAnalises: false,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};