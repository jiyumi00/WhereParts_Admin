import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
export default class DateSelect extends Component {

    constructor(props){
        super(props);
        this.state={
            startDate:null,
            endDate:null,
            today:false,
            week:false,
            month:false,
        }

    }
    setChangeDate=(dates)=>{

        console.log('dates',dates)
        const [start,end]=dates;
        this.setState({startDate:start,endDate:end})
        this.props.onDateListener(dates);
    }
    render() {
        console.log('button',this.state.today)
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class={this.state.today?"btn btn-outline-dark active":"btn btn-outline-dark"} onClick={()=>{this.setState({today:true,week:false,month:false})}}>Today</button>
                <button type="button" class={this.state.week?"btn btn-outline-dark active":"btn btn-outline-dark"} onClick={()=>{this.setState({today:false,week:true,month:false})}}>Week</button>
                <button type="button" class={this.state.month?"btn btn-outline-dark active":"btn btn-outline-dark"} onClick={()=>{this.setState({today:false,week:false,month:true})}}>Month</button>
                <DatePicker 
                    selectsRange={true}
                    className="datepicker-one"
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={this.state.startDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    maxDate={new Date()}
                    onInputClick={()=>{this.setState({today:false,week:false,month:false})}}
                    onChange={(dates)=>this.setChangeDate(dates)}/>       
            </div>
        );
    }
}