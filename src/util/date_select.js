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
            
        }
    }
    setChangeDate=(dates)=>{
        console.log('dates',dates)
        const [start,end]=dates;
        this.setState({startDate:start,endDate:end})
    }
    render() {
        return(
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-outline-dark">Today</button>
                <button type="button" class="btn btn-outline-dark">Week</button>
                <button type="button" class="btn btn-outline-dark">Month</button>
                <DatePicker 
                    selectsRange={true}
                    className="datepicker-one"
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    selected={this.state.startDate}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    maxDate={new Date()}
                    onChange={(dates)=>this.setChangeDate(dates)}/>       
            </div>
        );
    }
}