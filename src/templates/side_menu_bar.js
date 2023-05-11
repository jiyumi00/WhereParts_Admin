import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class SideMenuBar extends Component {

    render() {
        return (
            <ul class="menu-bar LightBlue">
                
                    <Link to ="/DashBoard" >
                        <li className="sidemenu">
                            <p>대시보드</p>
                        </li>
                    </Link>
                    <Link to="/UserInfo">
                        <li className="sidemenu">
                            <p>회원관리</p>
                        </li>
                    </Link>
                    <Link to="/Transaction" >
                        <li className="sidemenu">
                            <p>거래내역</p>
                        </li>
                    </Link>
                    <Link to="/Marketing">
                        <li className="sidemenu">
                            <p>마케팅관리</p>
                        </li>
                    </Link>

                

            </ul>
        )
    }
}