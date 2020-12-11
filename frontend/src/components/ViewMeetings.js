/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import Axios from 'axios'
import { useHistory } from 'react-router'
import {
  Container, Row, Col,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ViewMeetings = () => {
  const history = useHistory()
  const [user, setUser] = useState('')
  const [meetings, setMeetings] = useState([])

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await Axios.post('/account/authenticate')
        const { data: { username } } = res
        setUser(username)
        const meetingRes = await Axios.post('/api/meetings/creator')
        setMeetings(meetingRes.data)
      } catch (err) {
        console.log(err)
      }
    }
    checkAuthStatus()
  }, [])

  const handleLogout = () => {
    Axios.post('/account/logout').then(res => history.push('/'))
  }

  const createNewMeeting = () => {
    history.push('/')
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Dashboard</h1>
        </Col>
        {
              user !== ''
                ? (
                  <>
                    <Col>
                      <button type="button" style={{ float: 'right' }} onClick={handleLogout}>
                        Logout
                      </button>
                      <h4 style={{ float: 'right', paddingRight: '10px' }}> Hi {user} </h4>
                    </Col>
                  </>
                ) : null
        }
      </Row>
      <Row>
        <Col>
          <h4>View previous meetings you have created</h4>
        </Col>
        <Col>
          <Button style={{ float: 'right' }} onClick={createNewMeeting}> New meeting </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {meetings.map(meeting => (
            <Card style={{ marginTop: '10px' }} key={meeting._id} title={meeting.name} bordered={true}>
              <h6>Meeting ID: {meeting._id} </h6>
              <Link to={`showAvailabilities/${meeting._id}`}>Show Availiabilities</Link>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default ViewMeetings
