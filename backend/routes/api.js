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
    const meeting = await Meeting.create({ creator: username, dates })
    res.send(meeting)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.get('/meetings/:id', async (req, res, next) => {
  const { id } = req.params
  Meeting.find({ _id: id }, (err, meeting) => {
    if (!err) {
      res.send(meeting)
    } else {
      next(err)
    }
  })
})

router.post('/meetings/creator', async (req, res, next) => {
  const { username } = req.session
  Meeting.find({ creator: username }, (err, meetings) => {
    if (!err) {
      res.json(meetings)
    } else {
      next(err)
    }
  })
})

router.post('/meetings/availability/add', async (req, res, next) => {
  console.log(req.body)
  try {
    await Availability.create(req.body)
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

router.get('/meetings/availabilities/:id', async (req, res, next) => {
  const { id } = req.params
  Availability.find({ meetingId: id }, (err, availabilities) => {
    if (!err) {
      res.json(availabilities)
    } else {
      next(err)
    }
  })
})

module.exports = router
