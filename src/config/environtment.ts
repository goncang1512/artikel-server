import dotenv from 'dotenv'
dotenv.config()

const mongodbURI = `mongodb://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@ac-9qxrvsc-shard-00-00.g2asesd.mongodb.net:27017,ac-9qxrvsc-shard-00-01.g2asesd.mongodb.net:27017,ac-9qxrvsc-shard-00-02.g2asesd.mongodb.net:27017/?ssl=true&replicaSet=atlas-c8bw8f-shard-0&authSource=admin&retryWrites=true&w=majority`

const config = {
  db: process.env.CONNECTION_MONGO,
  dbOnline: mongodbURI,
  name: process.env.USERNAME_DATABASE_MONGO
}

export default config
