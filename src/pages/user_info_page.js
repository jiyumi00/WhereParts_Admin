import React,{Component} from "react";

import Template from "../templates/consists"
import UserInfo from "../components/user_info";
export default class UserInfoPage extends Component{
   render(){
    return(
        <Template>
            <UserInfo/>
        </Template>
    )
   }
}