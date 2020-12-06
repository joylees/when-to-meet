/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import ScheduleSelector from 'react-schedule-selector'
import { useHistory, useParams } from 'react-router'
import { Container, Row, Col } from 'react-bootstrap'
import { CopyOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { Form, Input, Button } from 'antd'

//need to get dates and times from database and set to schedule
//copy link to clipboard
//add availability to database (with name of user, get user input)
//view availability (& respondents & colors)

const AddAvailabilities = () => {
  const [schedule, setSchedule] = useState([])
  const { meetingId } = useParams()
  const [name, setName] = ('')

  const handleChange = newSchedule => {
    console.log('meetingId', meetingId)
    setSchedule(newSchedule)
    console.log(newSchedule)
  }

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
          <Button type="solid" icon={<ArrowRightOutlined />}>
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
              <Input placeholder="Your name" />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Submit</Button>
            </Form.Item>
          </Form>
        </Col>
        <Col>
          <ScheduleSelector
            selection={schedule}
            //need to get num of days from range
            numDays={5}
            //need to get min time and max time 
            minTime={8}
            maxTime={22}
            hourlyChunks={2}
            dateFormat="ddd M/D"
            timeFormat="HH:mm"
            onChange={handleChange}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default AddAvailabilities
