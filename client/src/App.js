import React from 'react'
import {Component} from 'react'
import './App.css'

class App extends Component{
  constructor(){
    super()
    this.state = {
      url: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event){
    event.preventDefault()

    fetch('/api/url/shorten', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl: this.state.url
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({url: data.shortUrl})
    })
    .catch(err => {
      console.error(err)
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.url}
          name="url"
          placeholer="Paste URL here"
          onChange={this.handleChange}
        />
        <button>Submit</button>
      </form>
    )
  }


}

export default App
