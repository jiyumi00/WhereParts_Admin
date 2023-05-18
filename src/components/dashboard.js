import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
            <div className="background location">
                <FullCalendar   
                    plugins={[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                    initialView={'dayGridMonth'}
                    headerToolbar={
                        {
                            start: 'today', 
                            center: 'title',
                            end: 'prev,next' 
                        }
                    }
                    height={"85vh"}
                    dateClick={this.dateClick}
                    events={[{title:'판매건수 : 23건', date:'2023-05-11',},{title:'판매건수 : 23건',date:'2023-05-13',}]}
                />
                <DashBoardItem/>
          
            </div>
            
            </>
            
        );
    }
}

class DashBoardItem extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return(
           
        <Card style={{ marginLeft:15 }}>
            <Card.Header>
                <Card.Title>매출액 TOP 10</Card.Title>
            </Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>1</ListGroup.Item>
                <ListGroup.Item>2</ListGroup.Item>
                <ListGroup.Item>3</ListGroup.Item>
                <ListGroup.Item>4 </ListGroup.Item>
                <ListGroup.Item>5</ListGroup.Item>
                <ListGroup.Item>6</ListGroup.Item>
                <ListGroup.Item>7</ListGroup.Item>
                <ListGroup.Item>8</ListGroup.Item>
                <ListGroup.Item>9</ListGroup.Item>
                <ListGroup.Item>10</ListGroup.Item>
            </ListGroup>
            <Card.Body>
        <Card.Link href="#">자세히보기</Card.Link>
      </Card.Body>
          </Card>
           
        )
    }
}