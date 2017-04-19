import socket from 'socketIO'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

console.log('socket', socket)

class ChatItem extends Component {
  render() {
    return (<li key={this.props.index}>{this.props.author}</li>)
  }
}

class Message extends Component {
  constructor() {
    super()

    this.state = {
      messages: []
    }
  }

/*  componentDidMount () {
    console.log("did mount")
    this.setState({messages: this.props.messages})
  }
*/
  createList () {
    console.log("messages", this.props.messages)
    return this.props.messages.map( (item, index) => {
      console.log(item)
      return (<ChatItem author={item.author} index={index}/>)
    })
  }

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
      messages: [{
        message: "Hello",
        user: "Bob"
      }]
    }
  }



  render () {
    return (
      <div className="bigger-box">
        <h1 className="person">{this.state.messages.user}</h1>

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
