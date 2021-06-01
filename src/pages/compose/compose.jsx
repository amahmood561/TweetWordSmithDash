import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form,Button, ButtonGroup, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import Swal from 'sweetalert2'
import Picker from 'emoji-picker-react';

export class Compose extends React.Component {

  onEmojiClick = (event, emojiObject) => {
    this.state.setChosenEmoji = emojiObject;
  };

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      charLimit: 10,
      chosenEmoji:null,
      setChosenEmoji:null
    };

  }


  componentDidMount(){
    console.log("mounting")
  }



  handleOnChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    if(this.state.content.length <= this.state.charLimit){
      Swal.fire({icon: 'success', text: 'Successful Submission'})
    }else{
      Swal.fire({icon: 'error', text: 'Character Limit Exceeded'})
    }
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
              <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
              <Breadcrumb.Item>Compose</Breadcrumb.Item>
            </Breadcrumb>
            <h4>Compose</h4>
            <p className="mb-0">Compose tweets here.</p>
          </div>
          <div className="btn-toolbar mb-2 mb-md-0">
            <ButtonGroup>
              <Button variant="outline-primary" size="sm">Share</Button>
              <Button variant="outline-primary" size="sm">Export</Button>
            </ButtonGroup>
          </div>
        </div>
        <label htmlFor="textarea">Compose tweet</label>
        <textarea className="form-control" placeholder="Enter your tweet..." id="textarea" rows="4"></textarea>

        <div style={{float : 'right', paddingTop : '5px'}}>
          <Button variant="primary">Tweet</Button>
        </div>
        {this.state.chosenEmoji ? (
          <span>You chose: {this.state.chosenEmoji.emoji}</span>
        ) : (
          <span>No emoji Chosen</span>
        )}
        <Picker onEmojiClick={this.onEmojiClick} />

      </>
    );
  };
}