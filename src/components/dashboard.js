import React, { Component } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import {Card,ListGroup,Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: false,
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

            priceTopList: [{ name: "인제정비", price: 2554000 }, { name: '부산정비', price: 203400 }, { name: '마산정비', price: 232000 }, { name: '김해정비', price: 12000 },
            { name: '울산정비', price: 15000 }, { name: '포항정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '부산정비', price: 2000 }, { name: '서울정비', price: 2000 }]
        }
    }
    render() {
        const date = this.props.date
        return (

            <Card style={{marginLeft: 15, minWidth:'200px'}}>
                <Card.Header>
                    <Card.Title className="m-auto textcenter p-2" >TOP 10<p className="m-auto fontSize">{date}</p></Card.Title>
                </Card.Header>
               
                <Card.Body>
                <Table className="height textcenter" bordered>
                <tbody>
                    {this.state.priceTopList.map((item, i) => <DashBoardItem item={item} index={i} />)}
                </tbody>
                </Table>
                </Card.Body>
                <Card.Footer className="p-3">
                <Card.Link href="#">더보기</Card.Link>
                </Card.Footer>
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
                <tr valign="middle">
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                </tr>
            </>

        )

    }
}

class DetailItem extends Component {
    constructor(props) {
        super(props);
    }
    approve = () => {
        alert('알림문자를 보냈습니다.')
        this.props.onHide()
    }
    render() {
        const item = this.props.item;
        return (
            <div className="modal width height" >

                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.onHide} />
                    </Modal.Header>

                    <Modal.Body>
                        <Carousel interval={null}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://source.unsplash.com/collection/190727/1600x900"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://source.unsplash.com/WLUHO9A_xik/1600x900"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <p>이름 : {item.username}</p>
                        <p>사업자 번호 : {item.id}</p>
                        <p>전화번호 : {item.phone}</p>
                        <p>가입일시 : {item.signupdate}</p>
                        <p>주소 : {item.address}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.approve() }}>수정</Button>
                        <Button variant="danger" onClick={() => { this.approve() }}>탈퇴</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}