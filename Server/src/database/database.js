import Sequelize from "sequelize";

export const sequelize = new Sequelize(
  "Futbol", // db name,
  "usuario1", // username
  "12345", // password
  {
    host: "localhost",
    dialect: "mssql",
     pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
  }
);
