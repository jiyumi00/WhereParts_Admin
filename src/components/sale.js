import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import DateSelect from "../util/date_select";
import WebServiceManager from "../util/webservice_manager";

export default class Sale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: false,
            contents: [],
           
        }
    }
    componentDidMount() {

        this.callGetGoodsAPI().then((response) => {
            console.log('goods', response)
            this.setState({ contents: response });
        })
      
        console.log('........................................');
    }

    goGetGoods = () => {
        this.callGetGoodsAPI().then((response) => {
            this.setState({ buyContents: response, emptyListViewVisible: response.length == 0 ? true : false })
        });
    }

    async callGetGoodsAPI() {
        let manager = new WebServiceManager("http://203.241.251.177/wparts/GetGoods?login_id=1");
        let response = await manager.start();
        if (response.ok)
            return response.json();

    }
    onDateListener=(dates)=>{
        console.log('datesListener',dates)
    }
    render() {

        return (

            <Container>
                <nav>
                    <Form className="d-flex topmenubar fright">
                        <DateSelect onDateListener={this.onDateListener}/>
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
            tab: false,
            
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
                    this.state.tab === true ? <DetailItem goodsID={item.id} onHide={() => { this.setState({ tab: false }) }} /> : null
                }
            </>
        )
    }
}

class DetailItem extends Component {
    constructor(props) {
        super(props);
        this.state={
            modalcontents: [],
        }
    }
    componentDidMount() {

        this.callGetGoodsDetailAPI().then((response) => {
            console.log('detailgoods', response)
            this.setState({ modalcontents: response });
        })
        console.log('........................................');
    }
      async callGetGoodsDetailAPI() {
        let manager = new WebServiceManager("http://203.241.251.177/wparts/GetGoodsDetail?login_id=3&id="+this.props.goodsID);
        let response = await manager.start();
        if (response.ok)
            return response.json();

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
                        <h5>판매글 정보</h5>
                        <p>id: {this.state.modalcontents.id}</p>
                        <p>userID: {this.state.modalcontents.userID}</p>
                        <p>name: {this.state.modalcontents.name}</p>
                        <p>number: {this.state.modalcontents.number}</p>
                        <p>price: {this.state.modalcontents.price}</p>
                        <p>hashTag: {this.state.modalcontents.hashTag}</p>
                        <p>quantity: {this.state.modalcontents.quantity}</p>
                        <p>genuine: {this.state.modalcontents.genuine}</p>
                        <p>spec: {this.state.modalcontents.spec}</p>
                        <p>valid: {this.state.modalcontents.valid}</p>
                        <p>removeFlag: {this.state.modalcontents.removeFlag}</p>
                        <p>registerDate: {this.state.modalcontents.registerDate}</p>

                    </Modal.Body>
                </Modal.Dialog>


            </div>
        )
    }
}