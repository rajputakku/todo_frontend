import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { Link } from "react-router-dom";


const Api = require('./Api.js')

class ListForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: {
        id: this.getListId(props),
        title: '',
        body: '',
      },
      redirect: null,
      errors: []
    }

    this.setTitle = this.setTitle.bind(this)
    this.setBody = this.setBody.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getListId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setTitle(event) {
    let newVal = event.target.value || ''
    this.setFieldState('title', newVal)
  }

  setBody(event) {
    let newVal = event.target.value || ''
    this.setFieldState('body', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.list[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let list = {
      title: this.state.list.title,
      body: this.state.list.body
    }

    Api.saveList(list, this.state.list.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/lists'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.list.id) {
      Api.getList(this.state.list.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              list: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, list, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Todo List</h3>

              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }

              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input type="text" name="title" id="title" value={list.title} placeholder="Enter title" onChange={this.setTitle} />
                </FormGroup>
                <FormGroup>
                  <Label for="body">Body</Label>
                  <Input type="text" name="body" id="body" value={list.body} placeholder="Enter body" onChange={this.setBody} />
                </FormGroup>
                <Button color="success">Submit</Button>
                <Link to="/lists" className="btn btn-primary" style={{float: "right"}}>
                Back to Todo List
              </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default ListForm