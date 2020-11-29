/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import 'antd/dist/antd.css'
import { TimePicker } from 'antd'
import moment from 'moment'

const format = 'HH:mm'

const PickTimes = () => (
  <>
    <h2>Choose potential times</h2>
    <div>
      <h4>Start Time</h4>
      <TimePicker defaultValue={moment('00:00', format)} format={format} />
      <h4>End Time</h4>
      <TimePicker defaultValue={moment('00:00', format)} format={format} />
    </div>
  </>
)

export default PickTimes