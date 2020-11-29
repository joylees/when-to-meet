const { Schema, model } = require('mongoose')

const meetingSchema = new Schema({
  dates: [{
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  }],
  creator: String,
})

module.exports = model('Meeting', meetingSchema)
