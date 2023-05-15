import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';

export default class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    dateClick=(info)=>{
        alert(info.dateStr)
     }
    render() {
        return(
            <>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3)'}}>
                <div style={{gridColumn:'1/2'}}>
                    <FullCalendar   
                        plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                        initialView={'dayGridMonth'}
                        headerToolbar={
                            {
                                start: 'today prev,next', // will normally be on the left. if RTL, will be on the right
                                center: 'title',
                                end: '' // will normally be on the right. if RTL, will be on the left
                            }
                        }
                        
                        height={"70vh"}
                        dateClick={this.dateClick}
                        events={[{title:'판매건수 : 23건', date:'2023-05-11',},{title:'판매건수 : 23건',date:'2023-05-13',}]}
                    />
                </div>
                <div style={{gridColumn:'2/2'}}>

                </div>
          
            </div>
            
            </>
            
        );
    }
}