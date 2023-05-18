import React, { useState, Component } from 'react';
import {  Form } from "react-bootstrap";


export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputID: '',
            inputPW: ''
        }
    }


    onInputIDHandler = (value) => {
        console.log(value)
        this.setState({ inputID: value })
    }
    onInputPWHandler = (value) => {
        this.setState({ inputPW: value })
    }


    render() {
        return (
            //디자인
            <div className="d-flex login-component width">
                <form>
                    <div className="background" >
                        <label>ID</label>
                        <Form.Control
                           type='text' className="width" value={this.state.inputID} onChange={(e) => { this.onInputIDHandler(e.target.value) }}
                        />
                    </div>
                    <div className="background" >
                        <label>Password</label>
                        <Form.Control
                         type='password' className="width" value={this.state.inputPW} onChange={(e) => { this.onInputPWHandler(e.target.value) }}
                        />
                    </div>
                    <div className="background" >
                    <button className="loginbutton width darknavy" formAction=''>Login</button>
                    </div>

                </form>
            </div>
        )
    }

}