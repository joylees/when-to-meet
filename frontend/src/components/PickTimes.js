/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { TimePicker } from 'antd'
import moment from 'moment'

const format = 'HH'

const PickTimes = ({ setStartTime, setEndTime }) => {
  const addStartTime = newStartTime => {
    const start = newStartTime.format('HH')
    setStartTime(start)
  }

  const addEndTime = newEndTime => {
    const end = newEndTime.format('HH')
    setEndTime(end)
  }

  return (
    <>
      <h2>Choose potential times</h2>
      <div>
        <h4>Start Time</h4>
        <TimePicker defaultValue={moment('00:00', format)} format={format} onChange={addStartTime} />
        <h4>End Time</h4>
        <TimePicker defaultValue={moment('00:00', format)} format={format} onChange={addEndTime} />
      </div>
    </>
  )
}

export default PickTimes
