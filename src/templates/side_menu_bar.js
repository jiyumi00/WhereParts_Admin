import React, { Component,Nav } from "react";
import { Link, NavLink, } from "react-router-dom";


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
           
        }
    }

    render() {
        return (

            <div className="menu-bar LightBlue">
                {
                    this.state.selectList.map((m, i) =>
                        <div className='sidemenu'>
                            <NavLink to={m.href} key={i} className={({isActive})=>isActive?"sidemenu-active":"sidemenu-inactive"}>
                                {m.name}
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