'use strict'

const rTracer = require('cls-rtracer')

const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format

// a custom format that outputs request id
const rTracerFormat = printf((info) => {
  const rid = rTracer.id()
  return rid
    ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
    : `${info.timestamp}: ${info.message}`
})

const logger = createLogger({
  format: combine(
    timestamp(),
    rTracerFormat
  ),
  transports: [new transports.File({ filename: './logs/error.log', level: 'error' }),
  new transports.File({ filename: './logs/app-logs.log' })]
})

module.exports = logger;