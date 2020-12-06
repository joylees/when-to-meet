/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Input, Button } from 'antd'
import { Container, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import PickDates from './PickDates'
import PickTimes from './PickTimes'
import 'antd/dist/antd.css'

const NewEvent = () => {
  const history = useHistory()
  const [dates, setDates] = useState({})
  const [startTime, setStartTime] = useState({})
  const [endTime, setEndTime] = useState({})

  const createEvent = async () => {
    const startDate = new Date(dates.startDate)
    startDate.setHours(startTime)

    const endDate = new Date(dates.endDate)
    endDate.setHours(endTime)

    const dateBody = { dates: { startDate, endDate } }
    const response = await Axios.post('api/meetings/create', dateBody)
    if (response.status === 200) {
      const { _id: id } = response.data
      history.push(`/addAvailabilities/${id}`)
    } else {
      alert('Could not create meeting')
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Plan a new meeting</h1>
        </Col>
      </Row>
      <Row className="mt-20">
        <Col>
          <PickDates setDates={setDates} />
        </Col>
        <Col>
          <PickTimes setStartTime={setStartTime} setEndTime={setEndTime} />
        </Col>
        <Col>
          <div style={{ width: '270px' }}>
            <h2>Name and create your event!</h2>
            <Input placeholder="Event name" />
            <Button onClick={createEvent}>Create Event</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NewEvent
