import Socket from 'socketIO'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const socket = Socket()
/*
socket.on('user:in', function (data) {
  console.log('user data', data)
})

socket.on('join:new', function (user) {
  console.log('new user has joined:', user)
})

socket.emit('message:new', {author: "foo", message: "my super message"})

socket.on('messages', function (msg) {
  console.log(`client ${msg}`)
})
*/

class ChatItem extends Component {
  render() {
    return (<li>{this.props.author}: {this.props.msg}</li>)
  }
}

class Message extends Component {

  createList = () => (
    this.props.messages.map( (item, index) => {
      return (<ChatItem author={item.author} msg={item.message} key={index} />)
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

  componentDidMount () {
    socket.on('user:in', (data) => {
      this.setState({currentUser: data.currentUser})
    })

    socket.on('messages', (msg) => {
      this.setState({messages: msg})
    })
  }

  sendMessage = (event) => {
    event.preventDefault()
    socket.emit('message:new', {
      author: this.state.currentUser,
      message: "my super message"
    })
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
          <button className="send" onClick={this.sendMessage} type="submit">Send</button>
        </div>
      </div>
      )
    }
  }


ReactDOM.render(
  <App />,
  document.getElementById('target')
)
