import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

export default class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    render() {
        return(
            <div>
            메인 화면입니다.
            <FullCalendar
                plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                initialDate={'dayGridMonth'}
                headerToolbar={
                    {
                        start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay' // will normally be on the right. if RTL, will be on the left
                    }
                }
            />


            </div>
        );
    }
}