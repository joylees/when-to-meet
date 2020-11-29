const express = require('express')

const Meeting = require('../models/meeting')
const Availability = require('../models/availability')

const router = express.Router()

router.get('/meetings', (req, res, next) => {
  Meeting.find({}, (err, meetings) => {
    if (!err) {
      res.json(meetings)
    } else {
      next(err)
    }
  })
})

router.post('/meetings/create', async (req, res, next) => {
  const { dates } = req.body
  const { username } = req.session
  try {
    await Meeting.create({ creator: username, dates })
    res.send('New meeting created')
  } catch (err) {
    next(err)
  }
})

router.post('/meetings/availability/add', async (req, res, next) => {
  try {
    await Availability.create({ ...req.body })
    res.send('New availability added')
  } catch (err) {
    next(err)
  }
})

router.post('/meetings/availability/update', async (req, res, next) => {
  const { meetingId, dates } = req.body
  try {
    await Availability.findOneAndUpdate({ meetingId }, { dates })
    res.send('New availability updated')
  } catch (err) {
    next(err)
  }
})

router.get('/meetings/availabilities', async (req, res, next) => {
  Availability.find({}, (err, availabilities) => {
    if (!err) {
      res.json(availabilities)
    } else {
      next(err)
    }
  })
})

router.get('/meetings/bestTime', async (req, res, next) => {
  const { meetingId } = req.body
  Availability.find({ meetingId }, (err, availabilities) => {
    if (!err) {
      res.json(availabilities)
    } else {
      next(err)
    }
  })
})

module.exports = router

// get optimal meeting time
// how to generate URL and get meeting ID from URL