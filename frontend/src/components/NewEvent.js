/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { useHistory } from 'react-router'
import { Input, Button } from 'antd'
import { Container, Row, Col } from 'react-bootstrap'
import PickDates from './PickDates'
import PickTimes from './PickTimes'
import 'antd/dist/antd.css'

const NewEvent = () => {
  const history = useHistory()

  const createEvent = () => {
    history.push('/addAvailabilities')
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Plan a new meeting</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PickDates />
        </Col>
        <Col>
          <PickTimes />
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
