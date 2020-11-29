/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Input, Button } from 'antd'
import PickDates from './PickDates'
import PickTimes from './PickTimes'
import 'antd/dist/antd.css'

const NewEvent = () => (
  <>
    <h1>Plan a new event</h1>
    <PickDates />
    <PickTimes />
    <div style={{ width: '270px' }}>
      <h2>Name and create your event!</h2>
      <Input placeholder="Event name" />
      <Button>Create Event</Button>
    </div>
  </>

)

export default NewEvent
