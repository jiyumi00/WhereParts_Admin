import React,{Component} from "react";
import Template from "../templates/consists"
import Sale from "../components/sale";

export default class SalePage extends Component{
   render(){
    return(
        <Template>
            <Sale/>
        </Template>
    )
   }
}