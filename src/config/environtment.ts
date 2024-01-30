import dotenv from 'dotenv'
dotenv.config()

const config = {
  db: process.env.CONNECTION_MONGO
}

export default config
