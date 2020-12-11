/* eslint-disable react/jsx-filename-extension */
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ScheduleSelector from 'react-schedule-selector'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
import { Container, Row, Col } from 'react-bootstrap'
import { Button } from 'antd'


const ShowAvailabilities = () => {
  const { meetingId } = useParams()
  const [schedule, setSchedule] = useState([])
  const [numDays, setNumDays] = useState(2)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [best, setBest] = useState(null)
  const [countDatetime, setcountDatetime] = useState(null)
  const [meetingName, setMeetingName] = useState('')

  var gapi = window.gapi
  var CLIENT_ID = "385310888978-9gi1j5stm9ecrkb5aca03k0rhgcm9lik.apps.googleusercontent.com"
  var API_KEY = "AIzaSyCz9M7gEmJCcKqDiYBGHVhFAUByPeWYnrY"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"

  const addToCalendar = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      const startDateTime = new Date(best)
      const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000).toISOString();
      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        var event = {
          'summary': "meeting name",
          'start': {
            'dateTime': startDateTime,
            // 'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': endDateTime,
            // 'timeZone': 'America/Los_Angeles'
          },
        }

        var request = gapi.client.calendar.events.insert({
          'calendarId': 'primary',
          'resource': event,
        })

        request.execute(event => {
          console.log(event)
          window.open(event.htmlLink)
        })
    })
  })
}

  useEffect(() => {
    console.log(meetingId)
    const getAvailabilities = async () => {
      try {
        const meeting = await Axios.get(`/api/meetings/${meetingId}`)
        if (meeting) {
          setMeetingName(meeting.meetingName)
          const start = new Date(meeting.data[0].dates.startDate)
          const end = new Date(meeting.data[0].dates.endDate)
          setStartDate(start)
          setEndDate(end)
          const diffTime = Math.abs(start - end)
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          setNumDays(diffDays)
        }
        const response = await Axios.get(`/api/meetings/availabilities/${meetingId}`)
        console.log(response)
        const allAvailableTimes = [];
        const allAvailableTimesUser = [];
        if (response.data && response.data.length > 0) {
          response.data.forEach(meeting => {
            if (meeting.availableTimes && meeting.availableTimes.length > 0) {
              meeting.availableTimes.forEach(time => {
                let cnt={};
                cnt.date=new Date(time);
                cnt.user=meeting.user;
                allAvailableTimesUser.push(cnt);
                allAvailableTimes.push(new Date(time))
              })
            }
          })
        }
        var count = [];
        var isMax=0;
        allAvailableTimesUser.forEach(function(i) { 
          let existingDate= count.find(x=>x.datetime.getTime()==i.date.getTime())
          // const index= count.indexOf(x=>x.datetime.getTime()==i.getTime())
          if(existingDate){
            existingDate.count++;
            existingDate.user+=',' + i.user;
            if(existingDate.count>isMax){
              isMax=existingDate.count;
            }
          }else{
            let cnt={};
            cnt.datetime=i.date;
            cnt.user=i.user;
            cnt.count=1;
            count.push(cnt);
            
            if(1>isMax){
              isMax=1;
            }
          }
        }
        )

        count.forEach(element => {
          element.percentage=element.count*100/isMax
        });
        setcountDatetime(count);
        const t = count.sort((a,b)=>a.count<b.count)[0]
        console.log('best', t)
        setBest(t.datetime)
        console.log('Printing later',best)
        setSchedule(allAvailableTimes)
        console.log(allAvailableTimes)
        const { availabletimes } = response
      } catch (err) {
        console.log(err)
      }
    }
    getAvailabilities()
  }, [])

const colorShade = (col, amt) => {
  col = col.replace(/^#/, '')
  if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

  let [r, g, b] = col.match(/.{2}/g);
  ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

  r = Math.max(Math.min(255, r), 0).toString(16)
  g = Math.max(Math.min(255, g), 0).toString(16)
  b = Math.max(Math.min(255, b), 0).toString(16)

  const rr = (r.length < 2 ? '0' : '') + r
  const gg = (g.length < 2 ? '0' : '') + g
  const bb = (b.length < 2 ? '0' : '') + b

  return `#${rr}${gg}${bb}`
}


let calculateFN40=(percentage)=>{
  if(percentage>50){
    return -40*percentage/100
  }else{
    return 40*percentage/100
  }
}

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    user
  </Tooltip>
)

  let renderDateCell=(renderDateCell,isSelected)=>{
    // console.log(renderDateCell)
    if(countDatetime!=null){
      const index= countDatetime.findIndex(x=>x.datetime.getTime()==renderDateCell.getTime());
      if(index>-1){     
        return(  
          <>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">
            {countDatetime[index].user}
          </Tooltip>}
            >
            <div style={{background:colorShade('#f7cad0',calculateFN40(countDatetime[index].percentage)),height:20}}></div>
        </OverlayTrigger>
        </>
        )
        console.log(countDatetime[index])
      }
    }
      
    return <div style={{background:'#fae0e4',height:20}}>

    </div>
  }
  return (
    <div>
      <Container>
        <Row>
          <h1>Show availabilities</h1>
        </Row>
        <Row>
          <Col>
          {
            (startDate && endDate && numDays) ?
<ScheduleSelector
              selection={schedule}
              startDate={startDate}
              numDays={numDays}
              renderDateCell={renderDateCell}
              minTime={startDate.getHours()}
              maxTime={endDate.getHours()}
              hourlyChunks={2}
              dateFormat="ddd M/D"
              timeFormat="HH:mm"
              //onChange={handleChange}
              />
            : 
            null
          }    
          </Col>
          <Col>
            <h6>Hover over each cell to find out which group member is free</h6>
            <h2>One of the best times for your group to meet is</h2>
            {
              best ? <h4>{best.toString()}</h4> : null
            }
            <Button onClick={addToCalendar}>Add event to your Google Calendar</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShowAvailabilities

