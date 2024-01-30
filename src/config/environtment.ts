import dotenv from 'dotenv'
dotenv.config()

const config = {
  db: process.env.CONNECTION_MONGO,
  name: process.env.USERNAME_DATABASE_MONGO
}

export default config
