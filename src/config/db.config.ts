import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(
  `${process.env.NAME_DATABASE_MYSQL}`,
  `${process.env.USERNAME_DATABASE_MYSQL}`,
  `${process.env.PASSWORD_DATABASE_MYSQL}`,
  {
    host: process.env.HOST_DATABASE_MYSQL,
    dialect: 'mysql'
  }
)

export default db
