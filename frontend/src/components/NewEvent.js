/* eslint-disable brace-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Input, Button } from 'antd'
import { Container, Row, Col } from 'react-bootstrap'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import PickDates from './PickDates'
import PickTimes from './PickTimes'
import 'antd/dist/antd.css'

const NewEvent = () => {
  const history = useHistory()
  const [dates, setDates] = useState({})
  const [startTime, setStartTime] = useState({})
  const [endTime, setEndTime] = useState({})
  const [user, setUser] = useState('')
  const [meetingName, setMeetingName] = useState('')

  const createEvent = async () => {
    const startDate = new Date(dates.startDate)
    startDate.setHours(startTime)

    const endDate = new Date(dates.endDate)
    endDate.setHours(endTime)

    const dateBody = { dates: { startDate, endDate }, meetingName, creator: user }
    const response = await Axios.post('api/meetings/create', dateBody)
    if (response.status === 200) {
      const { _id: id } = response.data
      history.push(`/addAvailabilities/${id}`)
    } else {
      alert('Could not create meeting')
    }
  }

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await Axios.post('/account/authenticate')
        const { data: { username } } = res
        setUser(username)
      } catch (err) {
        console.log(err)
      }
    }
    checkAuthStatus()
  }, [])

  const goToDashboard = () => {
    console.log('gotoDash')
    history.push('/dashboard')
  }

  const handleLogout = () => {
    console.log('log out')
    Axios.post('/account/logout').then(res => history.push('/login'))
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Plan a new meeting</h1>
        </Col>
        <Col>
          {
            user !== ''
              ? (
                <div style={{ float: 'right' }} className="d-flex">
                  <h4 className="mr-3"> Hi {user} </h4>
                  <Button style={{ marginRight: '10px' }} onClick={goToDashboard}> Your Dashboard </Button>
                  <Button onClick={handleLogout} shape="circle" icon={<LogoutOutlined />} />
                </div>
              ) : <Link style={{ float: 'right' }} to="/login">Log In</Link>
          }
        </Col>
      </Row>
      <Row style={{ marginTop: '20px' }}>
        <Col>
          <h1>1</h1>
          <PickDates setDates={setDates} />
        </Col>
        <Col>
          <h1>2</h1>
          <PickTimes setStartTime={setStartTime} setEndTime={setEndTime} />
        </Col>
        <Col>
          <div style={{ width: '270px' }}>
            <h1>3</h1>
            <h3>Name and create your event!</h3>
            <Input className="mt-3" onChange={e => { setMeetingName(e.target.value) }} placeholder="Event name" />
            <Button className="mt-1" onClick={createEvent}>Create Event</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NewEvent
