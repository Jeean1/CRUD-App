const { Sequelize, DataTypes } = require("sequelize");

// Establish db connection
const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "j2080",
  port: 5432,
  database: "patient_db",
  logging: false,
});

module.exports = { db, DataTypes };
