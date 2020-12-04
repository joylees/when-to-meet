/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'
import { Container, Row, Col } from 'react-bootstrap'

const AddAvailabilities = () => {
  const [schedule, setSchedule] = useState([])

  const handleChange = newSchedule => {
    setSchedule(newSchedule)
    console.log(newSchedule)
  }

  return (
    <Container>
      <h1>Add your availabilities</h1>
      <ScheduleSelector
        selection={schedule}
        numDays={5}
        minTime={8}
        maxTime={22}
        hourlyChunks={2}
        dateFormat="ddd M/D"
        timeFormat="HH:mm"
        onChange={handleChange}
      />
    </Container>
  )
}

export default AddAvailabilities
