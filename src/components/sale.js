import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal,CloseButton,Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

export default class Sale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: false,
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
    render() {

        return (
           
                <Container>
                <nav>
                    <Form className="d-flex topmenubar fright">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="searchinput"
                        />
                       <button className="searchbutton darknavy"><SearchIcon /></button>
                    </Form>
                </nav>
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>판매자</th>
                                <th>품명</th>
                                <th>올린날짜</th>
                                <th>판매금액</th>
                                <th>수량</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.contents.map((item, i) =>
                                    <SaleItem item={item} key={i} />)
                            }
                        </tbody>
                    </Table>
                   
                </Container>

        );
    }
}

class SaleItem extends Component {
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
        alert('승인되었습니다.')
        this.props.onHide()
    }
    refuse = () => {
        alert('반려되었습니다.')
        this.props.onHide()
    }
    render() {
        const item = this.props.item;
        return (
            <div className="modal w-100 h-100">

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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => { this.approve() }}>승인</Button>
                        <Button variant="danger" onClick={() => { this.refuse() }}>반려</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}