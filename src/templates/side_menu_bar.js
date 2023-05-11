import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class SideMenuBar extends Component {

    render() {
        return (
            <div class="menu-bar LightBlue">
               {/*  <ul>
                    <Link to ="/DashBoard">
                        <li>
                            <p></p>
                            <p>대시보드</p>
                        </li>
                    </Link>
                    <Link to="/UserInfo">
                        <li>
                            <p></p>
                            <p>회원관리</p>
                        </li>
                    </Link>
                    <Link to="/Transaction">
                        <li>
                            <p></p>
                            <p>거래내역</p>
                        </li>
                    </Link>
                    <Link to="/Marketing">
                        <li>
                            <p></p>
                            <p>마케팅관리</p>
                        </li>
                    </Link>

                </ul> */}

                <div><Link to="/DashBoard" className="">대시보드</Link></div>
                <div><Link to="/UserInfo" className="">회원관리</Link></div>
                <div><Link to="/Transaction" className="">거래내역</Link></div>
                <div><Link to="/Marketing" className="">마케팅관리</Link></div>
            </div>
        )
    }
}