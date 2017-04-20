import socket from 'socketIO'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

console.log('socket', socket)

class ChatItem extends Component {
  render() {
    return (<li>{this.props.author}</li>)
  }
}

class Message extends Component {
  constructor() {
    super()

    this.state = {
      messages: []
    }
  }

  createList = () => (
    this.props.messages.map( (item, index) => {
      return (<ChatItem author={item.author} key={index} />)
    })
  )

  render() {
    return (
      <ul>
        {this.createList()}
      </ul>
    )
  }
}



class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: "Person 1",
      messages: [{
        message: "Hello",
        author: "Bob"
      }]
    }
  }



  render () {
    return (
      <div className="bigger-box">
        <h1 className="person">{this.state.currentUser}</h1>

        <div>

          <div className="chat-area">
            <Message messages={this.state.messages} />
          </div>

        </div>
        <div className="controls">
          <input className="message" type="text" placeholder="Type a message..."/>
          <button className="send" type="submit">Send</button>
        </div>
      </div>
      )
    }
  }


ReactDOM.render(
  <App />,
  document.getElementById('target')
)
