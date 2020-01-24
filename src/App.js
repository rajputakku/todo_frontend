import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Lists from './Lists'
import ListForm from './ListForm'
import ListDelete from './ListDelete'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Lists} />
          <Route exact path='/lists' component={Lists} />
          <Route exact path='/lists/new' component={ListForm} />
          <Route
            exact path="/lists/:id/edit"
            render={(routeProps) => (
              <ListForm {...routeProps} />
            )}
          />
          <Route
            exact path="/lists/:id/delete"
            render={(routeProps) => (
              <ListDelete {...routeProps} />
            )}
          />
        </div>
      </Router>
    )
  }
}

export default App