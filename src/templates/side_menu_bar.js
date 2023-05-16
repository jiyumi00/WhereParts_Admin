import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class SideMenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white',
            selectList: [
                { name: "대시보드", href: "/DashBoard" },
                { name: "회원관리", href: "/UserInfo" },
                { name: "판매내역", href: "/Sale" },
                { name: "거래내역", href: "/Transaction" }
            ],
            selectValue: "대시보드",
        }
    }
    stateToggle(){
        this.state.tab='#0066FF';
    }
    render() {
        return (

            <ul className="menu-bar LightBlue">
                {
                    this.state.selectList.map((m, i) =>
                        <Link to={m.href} key={i} onClick={this.stateToggle()}>
                            <li className="sidemenu">
                                <p >{m.name}</p>
                            </li>
                        </Link>
                    )
                }

                {/* <Link to="/Marketing">
                    <li className="sidemenu">
                        <p>마케팅관리</p>
                    </li>
                </Link> */}



            </ul>
        )
    }
}