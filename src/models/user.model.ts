import db from '../config/db.config'
import { DataTypes } from 'sequelize'

const Users = db.define(
  'user',
  {
    username: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING }
  },
  {
    freezeTableName: true
  }
)

export default Users
