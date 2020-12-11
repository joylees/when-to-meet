/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import 'antd/dist/antd.css'
import moment from 'moment'
import '../styles/MultiDatePicker.css'
import { DatePicker, Space } from 'antd'

const { RangePicker } = DatePicker

const PickDates = ({ setDates }) => {
  const onChangeDate = async (_, dateStrings) => {
    // console.log('From: ', dates[0], ', to: ', dates[1])
    const startDate = dateStrings[0]
    const endDate = dateStrings[1]
    const newDate = { startDate, endDate }
    // setDates(newDate)
    setDates(newDate)
  }

  return (
    <>
      <h2>Choose potential dates</h2>
      <Space className="mt-3" direction="vertical" size={12}>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={onChangeDate}
        />
      </Space>
    </>
  )
}

export default PickDates
