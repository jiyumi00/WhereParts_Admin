import React,{Component} from "react";

import Template from "../templates/consists"
import DashBoard from "../components/dashboard";
export default class DashBoardPage extends Component{
   render(){
    return(
        <Template>
            <DashBoard/>
        </Template>
    )
   }
}