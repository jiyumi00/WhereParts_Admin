import React, { useState, Component } from 'react';



export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputID: '',
            inputPW: ''
        }
    }


    onInputIDHandler=(value)=>{
        console.log(value)
        this.setState({inputID:value})
    }
    onInputPWHandler=(value)=>{
        this.setState({inputPW:value})
    }


    render() {
        return (
            //디자인
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                width: '100%', height: '100vh'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}

                >
                    <label>ID</label>
                    <input type='text' value={this.state.inputID} onChange={(e)=>{this.onInputIDHandler(e.target.value)}} />
                    <label>Password</label>
                    <input type='password' value={this.state.inputPW} onChange={(e)=>{this.onInputPWHandler(e.target.value)}} />
                    <br />
                    <button formAction='' class="button btnFade btnLightBlue">
                        Login
                    </button>
                </form>
            </div>
        )
    }

}