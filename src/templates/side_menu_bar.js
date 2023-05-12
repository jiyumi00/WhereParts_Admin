import React, { Component} from "react";
import { Link } from "react-router-dom";


export default class SideMenuBar extends Component {
    constructor(props){
        super(props);
        this.state={
            menu:[false,false,false,false]
        }
    }
    render() {
        
        return (
        
            <ul class="menu-bar LightBlue" variant="tabs" defaultActiveKey="/DashBoard">

                <Link to="/DashBoard" >
                    <li className="sidemenu">
                        <p>대시보드</p>
                    </li>
                </Link>
                <Link to="/UserInfo" eventKey="link-2">
                    <li className="sidemenu">
                        <p>회원관리</p>
                    </li>
                </Link>
                <Link to="/Transaction" eventKey="link-3">
                    <li className="sidemenu">
                        <p>거래내역</p>
                    </li>
                </Link>
                <Link to="/Marketing" eventKey="link-4">
                    <li className="sidemenu">
                        <p>마케팅관리</p>
                    </li>
                </Link>



            </ul>
        )
    }
}