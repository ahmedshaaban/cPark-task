import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReportList from './ReportList'
import ReportView from './ReportView'
import Login from './Login'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={ReportList} />
          <Route path='/new' exact component={ReportView} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>
    )
  }
}

export default App
