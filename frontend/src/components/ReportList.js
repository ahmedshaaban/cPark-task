import React, { Component } from 'react'
import {
  Button, Container, Table
} from 'reactstrap'
import { Link } from 'react-router-dom'
import withAuth from './withAuth'
import AuthService from './AuthService'
import ReactMapGL, { Marker } from 'react-map-gl'

class ReportList extends Component {
  constructor (props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {
      reports: [{ title: 'cairo', coordinates: [30.04, 31.23] }],
      isLoading: true,
      lat: 30.04,
      long: 31.23,
      filter: 'distance',
      viewport: {
        width: 400,
        height: 400,
        latitude: 30.04,
        longitude: 31.23,
        zoom: 8
      }
    }
  }

  componentDidMount () {
    this.setState({ isLoading: false })
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    let { target } = event
    const name = target.id
    if (name === 'filter') {
      target.value = target.checked ? 'time' : 'distance'
    }
    this.setState({
      [name]: target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    fetch(`/report/${this.state.lat}/${this.state.long}?filter=${this.state.filter}`, {
      headers: {
        'Authorization': `Bearer ${this.Auth.getToken()}`
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ reports: data, isLoading: false })
        let features = []
        data.reports.forEach(report => {
          features.push({
            type: 'Feature', geometry: { type: 'Point', coordinates: report.coordinates }
          })
        })
        this.setState({
          viewport: {
            width: 400,
            height: 400,
            latitude: data.reports[0].coordinates[0],
            longitude: data.reports[0].coordinates[1],
            zoom: 8
          }
        })
      })
  }

  render () {
    const { reports, isLoading } = this.state

    if (isLoading) {
      return (
        <p>
          Loading...
        </p>
      )
    }
    const reportList = reports.map(report => (
      <tr key={report.id}>
        <td style={{ whiteSpace: 'nowrap' }}>
          {report.title}
        </td>
        <td>
          {report.coordinates[0]}
          {' '}
          -
          {' '}
          {report.coordinates[1]}
        </td>
        <td>{report.time}</td>
      </tr>
    ))

    const markerList = reports.map(report => (
      <Marker latitude={report.coordinates[0]} longitude={report.coordinates[1]} offsetLeft={-20} offsetTop={-10}>
        <span className='glyphicon glyphicon-map-marker' />
      </Marker>
    ))

    return (
      <div>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />
        <Container fluid>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label>
                  lat:
                  <input type='number' step='0.01' id='lat' value={this.state.lat} onChange={this.handleInputChange} required />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  lng:
                  <input type='number' step='0.01' id='long' value={this.state.long} onChange={this.handleInputChange} required />
                </label>
              </div>
              <div className='form-group'>
                <label>
                  filter:
                  <input type='checkbox' id='filter' onChange={this.handleInputChange} />
                  On -> date / Off -> distance
                </label>
              </div>
              <input type='submit' value='Search' />
            </form>
          </div>
          <hr />
          <h3>
            Reports
            <div className='float-right'>
              <Button color='success' tag={Link} to='/new'>
                Add Report
              </Button>
            </div>
          </h3>
          <Table className='mt-4'>
            <thead>
              <tr>
                <th width='20%'>
                  Title
                </th>
                <th width='20%'>
                  Coordinates
                </th>
                <th width='20%'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {reportList}
            </tbody>
          </Table>
        </Container>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.42.0/mapbox-gl.css' rel='stylesheet' />
        <ReactMapGL mapboxApiAccessToken='pk.eyJ1IjoiYWhtZWRzaGFhYmFuIiwiYSI6ImNqa3FwYW9zNjI5eGcza3BjM2NkN2hoOWgifQ.Mx1Wj_aRk5YzXBZr_qd0kg'
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({ viewport })}
        >
          {markerList}
        </ReactMapGL>
      </div>

    )
  }
}

export default withAuth(ReportList)
