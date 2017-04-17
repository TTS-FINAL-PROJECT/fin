import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  render () {
    return (
      <div>
        Hello From React JS!
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('target')
)
