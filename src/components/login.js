import React, { Component } from 'react';



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
            <div className="login-component">
                <form>
                    <div>
                        <label>ID</label>
                        <input type='text' value={this.state.inputID} onChange={(e) => { this.onInputIDHandler(e.target.value) }} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type='password' value={this.state.inputPW} onChange={(e) => { this.onInputPWHandler(e.target.value) }} />
                    </div>
                    <div>
                        <button formAction=''>Login</button>
                    </div>

                </form>
            </div>
        )
    }

}