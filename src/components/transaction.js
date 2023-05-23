import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import DateSelect from "../util/date_select";
import Constant from "../util/constant_variables";

export default class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: false,
            selectList: ["배송전", "배송중", "배송완료", "거래완료"],
            selectValue: "배송전",
            contents: [
                {
                    userID: "판매자",
                    name: "품명",
                    registerDate: "2020-05-30",
                    price: 10000,
                    quantity: 1
                },
                {
                    userID: "판매",
                    name: "품명",
                    registerDate: "2023-04-10",
                    price: 20000,
                    quantity: 2
                }]
        }
    }
    handleChange = (e) => {
        console.log(`*****handleChange*****`);
        console.log(`선택한 값 : ${e.target.value}`);

        this.setState({
            selectValue: e.target.value
        });
    };
    onDateListener=(date)=>{
        console.log('date',date)
        this.setState({dateRange:[],date:date});
    }
    onDateRangeListener=(dates)=>{
        console.log('dateRange',dates)
        this.setState({dateRange:dates,date:0});
    }
    render() {

        return (
            <Container>
                <nav className="topmenubar">
                    <div className="d-flex topmenubar">
                        {this.state.selectList.map((value, i) => (
                            <div style={{marginRight:'15px'}} key={i}>
                                <input
                                    id={value}
                                    value={value}
                                    name="radio"
                                    type="radio"
                                    checked={this.state.selectValue === value}
                                    onChange={this.handleChange} />
                                <label htmlFor={value}> {value}</label>

                            </div>
                        ))}

                    </div>

                    <div className="d-flex flex-row">
                        <Form>
                            <div className="d-flex fleft">
                                <DateSelect onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} />
                            </div>

                            <div className="d-flex fright" style={{ marginLeft: '15px' }}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    className="searchinput"
                                />
                                <button className="searchbutton darknavy"><SearchIcon /></button>
                            </div>

                        </Form>
                    </div>

                </nav>


                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>판매자</th>
                            <th>품명</th>
                            <th>구매자</th>
                            <th>결제수단</th>
                            <th>결제날짜</th>
                            <th>주문번호</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.contents.map((item, i) =>
                                <TransactionItem item={item} key={i} />)
                        }
                    </tbody>
                </Table>
                {
                    this.state.tab === true ? <DetailItem /> : null
                }
            </Container>

        );
    }
}
class TransactionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: false
        }

    }
    render() {
        const item = this.props.item;
        return (
            <>
                <tr onClick={() => { this.setState({ tab: true }) }}>
                    <td>{item.userID}</td>
                    <td>{item.name}</td>
                    <td>{item.registerDate}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity}</td>
                </tr>
                {
                    this.state.tab === true ? <DetailItem item={item} onHide={() => { this.setState({ tab: false }) }} /> : null
                }
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
            <div className="modal w-100 h-100" >

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
                        <p>판매글 정보 {item.userID} {item.name}</p>
                        <p>판매자에 대한 필요한 정보(주소)</p>
                        <p>판매금액</p>
                        <p>수량</p>
                        <p>올린날짜</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { this.approve() }}>알림</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}