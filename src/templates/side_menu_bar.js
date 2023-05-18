import React, { Component, Nav } from "react";
import { Link, NavLink, } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReceiptIcon from '@mui/icons-material/Receipt';

export default class SideMenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectList: [
                { name: "대시보드", href: "/DashBoard", icon: <HomeIcon /> },
                { name: "회원관리", href: "/UserInfo", icon: <PersonIcon /> },
                { name: "판매내역", href: "/Sale", icon: <MonetizationOnIcon /> },
                { name: "거래내역", href: "/Transaction", icon: <ReceiptIcon /> }
            ],

        }
    }

    render() {
        return (

            <div className="menu-bar LightBlue">
                {
                    this.state.selectList.map((m, i) =>
                        <div className='sidemenu'>
                            <NavLink to={m.href} key={i} className={({ isActive }) => isActive ? "sidemenu-active" : "sidemenu-inactive"}>
                                {m.icon} {m.name}
                            </NavLink>
                        </div>

                    )
                }

                {/* <Link to="/Marketing">
                    <li className="sidemenu">
                        <p>마케팅관리</p>
                    </li>
                </Link> */}



            </div>
        )
    }
}