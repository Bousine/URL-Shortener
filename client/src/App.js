import React from 'react'
import {Component} from 'react'
import Feedback from './Feedback'

import './App.css'
import Jumbotron from "react-bootstrap/Jumbotron"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"

class App extends Component{
  constructor(){
    super()
    this.state = {
      url: "",
      alreadyShort: false,
      valid: true,
      success: false
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
    const prevUrl = this.state.url

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
    .then(res => {
      if(res.status === 400){throw new Error('Invalid Url')}
      else{
        this.setState({valid: true})
        return res.json()
      }
    })
    .then(data => {
      this.setState({url: data.shortUrl, success: true})
      if(prevUrl === this.state.url && this.state.valid){
        this.setState({alreadyShort: true})
      }else{
        this.setState({alreadyShort: false})
      }
    })
    .catch(err => {
      this.setState({valid: false, success: false, alreadyShort: false})
    })
  }

  render(){
    return (
      <div>
        <Container className="p-3">
          <Jumbotron>
            <h1 className="header">Shorten your Link.</h1>
            <InputGroup className="mb-3">
              <FormControl
                name="url"
                placeholder="Insert your URL here"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={this.state.url}
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={this.handleSubmit}>
                    Shorten
                </Button>
              </InputGroup.Append>
            </InputGroup>
            <Feedback attributes={this.state}/>
          </Jumbotron>
        </Container>

      </div>
    )
  }


}

export default App
