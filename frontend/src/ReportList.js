import React, { Component } from 'react'
import {
  Button, Container, Table
} from 'reactstrap'
import { Link } from 'react-router-dom'

class ReportList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      reports: [],
      isLoading: true,
      lat: 0,
      long: 0,
      distance: 10
    }
  }

  componentDidMount () {
    this.setState({ isLoading: false })
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const { target } = event
    const name = target.id
    if (target.id === 'distance' && target.value > 10) { target.value = 10 }

    this.setState({
      [name]: target.value
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.setState({ isLoading: true })
    fetch(`/report/${this.state.lat}/${this.state.long}?distance=${this.state.distance}`)
      .then(response => response.json())
      .then(data => this.setState({ reports: data, isLoading: false }))
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
      </tr>
    ))

    return (
      <div>
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
                distance:
                  <input type='number' id='distance' value={this.state.distance} onChange={this.handleInputChange} required />
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
              </tr>
            </thead>
            <tbody>
              {reportList}
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default ReportList
