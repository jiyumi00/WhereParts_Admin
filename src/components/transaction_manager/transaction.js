import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton } from "react-bootstrap";
import PageHeader from "../../util/page_header";

export default class Transaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectList: ["배송전", "배송중", "배송완료", "거래완료"],
            selectValue: "배송전",
            transactionColmname: ["판매자", "품명", "구매자", "결제수단", "결제날짜", "주문번호"],
            salesContents: [
                {
                    userID: "배송전 판매자",
                    name: "품명",
                    registerDate: "2020-05-30",
                    price: 10000,
                    quantity: 1
                },
            ],
        }
    }

    //라디오버튼리스너
    handleChange = (e) => {
        this.setState({ selectValue: e.target.value });
        console.log(`*****handleChange*****`);
        console.log(`선택한 값 : ${e.target.value}`);
    }
    render() {

        return (
            <Container>
                <nav className="topmenubar">
                    <div className="d-flex topmenubar">
                        {this.state.selectList.map((value, i) => (
                            <div style={{ marginRight: '15px' }} key={i}>
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

                    <PageHeader />

                </nav>

                <Table hover>
                    <thead>
                        <tr>
                            {
                                this.state.transactionColmname.map((tcname, i) =>
                                    <th key={i}>{tcname}</th>
                                )
                            }

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.salesContents.map((item, i) =>
                                <TransactionItem item={item} key={i} />)
                        }
                    </tbody>
                </Table>

            </Container>

        );
    }
}


class TransactionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }

    }
    render() {
        const item = this.props.item;
        return (
            <>
                <tr onClick={() => { this.setState({ modalVisible: true }) }}>
                    <td>{item.userID}</td>
                    <td>{item.name}</td>
                    <td>{item.registerDate}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity}</td>
                </tr>
                {
                    this.state.modalVisible === true ? <SalesDetailModal item={item} onHide={() => { this.setState({ modalVisible: false }) }} /> : null
                }
            </>
        )
    }
}

class SalesDetailModal extends Component {
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
            <div className="modal w-100 height" >
                <Modal.Dialog
                    size="lg"
                    centered>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.onHide} />
                    </Modal.Header>

                    <Modal.Body>

                        <Carousel interval={null}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100" height={'450px'}
                                    src="https://source.unsplash.com/collection/190727/1600x900"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                            <table className="topmenubar w-100">
                                <tbody>
                                <tr>
                                    <th><p>판매글 정보</p></th>
                                    <td><p>내용</p></td>
                                </tr>
                                <tr>
                                    <th><p>판매자에 대한 필요한 정보(주소)</p></th>
                                    <td><p>내용</p></td>
                                </tr>
                                <tr>
                                    <th><p>판매금액</p></th>
                                    <td><p>내용</p></td>
                                </tr>
                                <tr>
                                    <th><p>수량</p></th>
                                    <td><p>내용</p></td>
                                </tr>
                                <tr>
                                    <th> <p>올린날짜</p></th>
                                    <td><p>내용</p></td>
                                </tr>
                                </tbody>
                               
                            </table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { this.approve() }}>알림</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}