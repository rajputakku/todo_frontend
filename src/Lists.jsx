import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import ListsTable from './ListsTable'

const Api = require('./Api.js')

class Lists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lists: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getLists()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            lists: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            lists: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, lists } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )

    } else {

      return (
        <Container>
          <Row>
            <Col>
              <ListsTable lists={lists}></ListsTable>
              <Link className="btn btn-primary" to="/lists/new">Add Todo List</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Lists