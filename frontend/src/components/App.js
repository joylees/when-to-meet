/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import AddAvailabilities from './AddAvailabilities'
import NewEvent from './NewEvent'
import 'bootstrap/dist/css/bootstrap.min.css'
import ShowAvailabilities from './ShowAvailabilities'
import Login from './Login'
import SignUp from './SignUp'
import ViewMeetings from './ViewMeetings'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NewEvent />
        </Route>
        <Route path="/addAvailabilities/:meetingId">
          <AddAvailabilities />
        </Route>
        <Route path="/showAvailabilities/:meetingId">
          <ShowAvailabilities />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/dashboard">
          <ViewMeetings />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
