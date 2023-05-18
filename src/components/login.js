import React, { useState, Component } from 'react';



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
            <div className="login-component width">
                <form>
                    <div className="background">
                        <label>ID</label>
                        <input type='text' className="width" value={this.state.inputID} onChange={(e) => { this.onInputIDHandler(e.target.value) }} />
                    </div>
                    <div className="background">
                        <label>Password</label>
                        <input type='password' className="width" value={this.state.inputPW} onChange={(e) => { this.onInputPWHandler(e.target.value) }} />
                    </div>
                    <div className="background">
                        <button className="width" formAction=''>Login</button>
                    </div>

                </form>
            </div>
        )
    }

}