import React, { Component } from 'react'
import {
  Container, Button
} from 'reactstrap'
import { geolocated } from 'react-geolocated'
import { Link } from 'react-router-dom'

class ReportView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount () {
    this.setState({
      isLoading: false
    })
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const { target } = event
    const name = target.id
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    console.log(this.state.title)
    fetch('/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        title: this.state.title,
        coordinates: [this.props.coords.latitude, this.props.coords.longitude],
        time: Date.now()
      })
    })
      .then(response => response.json())
      .then(() => {
        alert('Added')
        this.setState({ title: '', isLoading: false })
      })
  }

  render () {
    const { isLoading } = this.state

    if (isLoading) {
      return (
        <p>
          Loading...
        </p>
      )
    }

    return (
      !this.props.isGeolocationEnabled
        ? (
          <div>
            Geolocation is not enabled
          </div>
        )
        : this.props.coords ? (
          <div>
            <Container fluid>
              <Button color='success' tag={Link} to='/'>
                Report List
              </Button>
              <hr />
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <label>
                      title:
                      <input type='text' id='title' value={this.state.title} onChange={this.handleInputChange} />
                    </label>
                  </div>
                  <div className='form-group'>
                    <label>
                      lat:
                      <input type='number' id='lat' value={this.props.coords.latitude} onChange={this.handleInputChange} disabled />
                    </label>
                  </div>
                  <div className='form-group'>
                    <label>
                      lng:
                      <input type='number' id='long' value={this.props.coords.longitude} onChange={this.handleInputChange} disabled />
                    </label>
                  </div>
                  <input type='submit' value='Search' />
                </form>
              </div>
            </Container>
          </div>
        ) : (
          <div>
              Getting the location data&hellip;
            {' '}
          </div>
        )
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(ReportView)
