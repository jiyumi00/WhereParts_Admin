import React,{Component} from "react";
import Template from "../templates/consists"
import Transaction from "../components/transaction_manager/transaction";

export default class TransactionPage extends Component{
   render(){
    return(
        <Template>
            <Transaction/>
        </Template>
    )
   }
}