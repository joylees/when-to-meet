const { Schema, model } = require('mongoose')

const availabilitySchema = new Schema({
  availableTimes: [
    {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
    },
  ],
  meetingId: { type: String, required: true },
  user: { type: String, required: true },
})

module.exports = model('Availability', availabilitySchema)
