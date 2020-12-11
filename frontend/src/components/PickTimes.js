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
      <h3>Choose potential times</h3>
      <div className="d-flex mt-3">
        <div className="mr-3">
          <h6>Start Time</h6>
          <TimePicker defaultValue={moment('00:00', format)} format={format} onChange={addStartTime} />
        </div>
        <div>
          <h6>End Time</h6>
          <TimePicker defaultValue={moment('00:00', format)} format={format} onChange={addEndTime} />
        </div>
      </div>
    </>
  )
}

export default PickTimes
