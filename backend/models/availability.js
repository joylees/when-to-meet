const { Schema, model } = require('mongoose')

const availabilitySchema = new Schema({
  availableTimes: [{ type: Date, required: true }],
  meetingId: { type: String, required: true },
  user: { type: String, required: true },
})

module.exports = model('Availability', availabilitySchema)
