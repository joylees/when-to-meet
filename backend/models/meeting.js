const { Schema, model } = require('mongoose')

const meetingSchema = new Schema({
  dates: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  creator: String,
})

module.exports = model('Meeting', meetingSchema)
