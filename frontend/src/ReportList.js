import React, { Component } from 'react';
import {
  Button, ButtonGroup, Container, Table,
} from 'reactstrap';
import { Link } from 'react-router-dom';

class ReportList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      isLoading: true,
      lat: 0,
      long: 0,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const name = target.id;

    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    fetch(`/report/${this.state.lat}/${this.state.long}`)
      .then(response => response.json())
      .then(data => this.setState({ reports: data, isLoading: false }));
  }

  render() {
    const { reports, isLoading } = this.state;

    if (isLoading) {
      return (
        <p>
          Loading...
        </p>
      );
    }

    const reportList = reports.map(report => (
      <tr key={report.id}>
        <td style={{ whiteSpace: 'nowrap' }}>
          {report.title}
        </td>
        <td>
          {report.coordinates}
        </td>
      </tr>
    ));

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/reports/new">
              Add Report
            </Button>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                lat:
                <input type="text" id="lat" value={this.state.lat} onChange={this.handleInputChange} />
              </label>
              <label>
                lng:
                <input type="text" id="long" value={this.state.long} onChange={this.handleInputChange} />
              </label>
              <input type="submit" value="Search" />
            </form>
          </div>
          <h3>
            Reports
          </h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="20%">
                  Title
                </th>
                <th width="20%">
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
    );
  }
}

export default ReportList;
