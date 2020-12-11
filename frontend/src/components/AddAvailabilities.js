/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'
import { useHistory, useParams } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'
import Axios from 'axios'
import { endOfHour } from 'date-fns'

//need to get dates and times from database and set to schedule
//copy link to clipboard
//add availability to database (with name of user, get user input)
//view availability (& respondents & colors)

const AddAvailabilities = () => {
  const history = useHistory()
  const [schedule, setSchedule] = useState([])
  const { meetingId } = useParams()
  const [name, setName] = useState('')
  const [numDays, setNumDays] = useState(2)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleChange = newSchedule => {
    console.log('meetingId', meetingId)
    setSchedule(newSchedule)
    console.log(newSchedule)
  }

  const  saveAvailabilities = async () => {
    if (name == '') {
      alert('Make sure to fill out your name first!')
    } else {
      const data = { availableTimes: schedule, meetingId, user: name}
      const response = await Axios.post('/api/meetings/availability/add', data)
      if (response.status === 200) {
        console.log({response})
        history.push(`/showAvailabilities/${meetingId}`)
      } else {
        alert('Could not create meeting')
      }
    }
  }

  useEffect(() => {
    const getMeetingDates = async () => {
      try {
        const response = await Axios.get(`/api/meetings/${meetingId}`)
        const start = new Date(response.data[0].dates.startDate)
        const end = new Date(response.data[0].dates.endDate)

        setStartDate(start)
        setEndDate(end)

        const diffTime = Math.abs(start - end)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        console.log(diffTime + " milliseconds")
        console.log(diffDays + " days")

        setNumDays(diffDays)
      } catch (err) {
        console.log(err)
      }
    }
    getMeetingDates()
  }, [])


  return (
    <Container>
      <Row>
        <Col lg={9}>
          <h1>Add your availabilities</h1>
          <Button type="dashed" icon={<CopyOutlined />}>
            Copy this meeting link
          </Button>
        </Col>
        <Col lg={3}>
          <Button onClick={saveAvailabilities} type="solid" icon={<ArrowRightOutlined />}>
            Submit and view other's availabilities
          </Button>
        </Col>
      </Row>
      <p />
      <Row>
        <Col>
          <Form style={{ marginTop: '2em', width: '75%' }}
            // onValuesChange={onFormLayoutChange}
          >
            <Form.Item>
              <Input onChange={(e)=>{setName(e.target.value)}} placeholder="Your name" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          {
            (startDate && endDate && numDays) ?
<ScheduleSelector
              selection={schedule}
              startDate={startDate}
              numDays={numDays}
              minTime={startDate.getHours()}
              maxTime={endDate.getHours()}
              hourlyChunks={2}
              dateFormat="ddd M/D"
              timeFormat="HH:mm"
              onChange={handleChange}
              />
            : 
            null
          }    
        </Col>
      </Row>
    </Container>
  )
}

export default AddAvailabilities
