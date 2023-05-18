import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import Table from 'react-bootstrap/Table'

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDate: null,
            modalVisible: true
        }
    }
    dateClick = (info) => {
        this.setState({ modalVisible: true, selectDate: info.dateStr })
    }
    render() {
        return (
            <>
                <div className="background location">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                        events={[{ title: '판매건수 : 23건', date: '2023-05-11', }, { title: '판매건수 : 23건', date: '2023-05-13', }]}
                    />
                    {this.state.modalVisible && <DashBoardTopList date={this.state.selectDate} />}

                </div>

            </>

        );
    }
}

class DashBoardTopList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image:['images/one.png','images/two.png'],
            priceTopList: [{ name: "인제정비", price: 2554000, }, { name: '부산정비', price: 203400 }, { name: '마산정비', price: 232000 }, { name: '김해정비', price: 12000 },
            { name: '울산정비', price: 15000 }, { name: '포항정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '서울정비', price: 2000 }]
        }
    }
    render() {
        const date = this.props.date
        return (

            <Card style={{ width: 'auto', marginLeft: 15 }}>
                <Card.Header style={{ height: 60, backgroundColor: '#FFFADF', }}>
                    <Card.Title style={{ textAlign: 'center' }}>{date} TOP 10</Card.Title>
                </Card.Header>
                <Table striped bordered hover>
                <tbody>
                    {this.state.priceTopList.map((item, i) => <DashBoardItem item={item} index={i} />)}
                </tbody>
                </Table>
                <Card.Body>
                    <Card.Link href="#">더보기</Card.Link>
                </Card.Body>
            </Card>

        )
    }
}

class DashBoardItem extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const item = this.props.item;
        const index=this.props.index;
        return (
            <>
                <tr>
                    <td>
                    <img src={'images/one.png'} alt='one' className="img"/></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            </>

        )

    }
}

