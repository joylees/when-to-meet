/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { DatePicker, Space } from 'antd'
import 'antd/dist/antd.css'
import moment from 'moment'

const { RangePicker } = DatePicker

const onChange = (dates, dateStrings) => {
  console.log('From: ', dates[0], ', to: ', dates[1])
  console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
}

const PickDates = () => (
  <>
    <h2>Choose potential dates</h2>
    <Space direction="vertical" size={12}>
      <RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        onChange={onChange}
      />
    </Space>
  </>
)

export default PickDates
