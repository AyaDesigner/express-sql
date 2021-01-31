require('dotenv').config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT} = process.env
const Sequelize = require('sequelize');

// create connector
const connector = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT
});

// authenticate to the db
const authenticateToDatabase = async (connector) => {
  try {
    // hopefully you connect
    await connector.authenticate();
    console.log('Succesfully connected to the db')
  } catch (err) {
    // if you do not connect
    console.log(`Something failed on the DB connection: ${err}`)
  }
}

authenticateToDatabase(connector)

// create the db object
const db = {};
// add sequelize, the connector and the models)
db.Sequelize = Sequelize;
db.connector = connector;
db.dog = require('../models/dog.model')(Sequelize, connector);

// export the db
module.exports = db;