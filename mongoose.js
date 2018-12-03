// Package
import bluebird from 'bluebird'
import mongoose from 'mongoose'

// Ours
import config from '../config'

// Set mongoose Promise to Bluebird
mongoose.Promise = bluebird

// Retry connection
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  return mongoose.connect(config.db.mongo.uri, config.db.mongo.opts)
}

// Exit application on error
mongoose.connection.on('error', err => {
  console.log(`MongoDB connection error: ${err}`)
  setTimeout(connectWithRetry, 5000)
  // process.exit(-1)
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})

if (config.env === 'development') {
  mongoose.set('debug', true)
}

const connect = () => {
  connectWithRetry()
}

export default { connect }