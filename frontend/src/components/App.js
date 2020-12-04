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

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <NewEvent />
        </Route>
        <Route exact path="/addAvailabilities">
          <AddAvailabilities />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
