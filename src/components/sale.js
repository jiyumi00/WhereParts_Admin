import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import DateSelect from "../util/date_select";
import WebServiceManager from "../util/webservice_manager";
import Constant from "../util/constant_variables";

export default class Sale extends Component {
    constructor(props) {
        super(props);

        this.state = {
            goodsContents: [],
            date:0,  // 0: 설정x, 1:today, 2:week, 3:month
            dateRange:[], //기간 범위
        }
    }
    componentDidMount() {
        this.goGetGoods();
    }

    goGetGoods() {
        this.callGetGoodsAPI().then((response) => {
            this.setState({ goodsContents: response})
        });
    }
    //기간설정리스너
    onDateListener=(date)=>{
        console.log('date',date)
        this.setState({dateRange:[],date:date});
    }
    onDateRangeListener=(dates)=>{
        console.log('dateRange',dates)
        this.setState({dateRange:dates,date:0});
    }
    async callGetGoodsAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoods?login_id=1");
        let response = await manager.start();
        if (response.ok)
            return response.json();
    }
   
    render() {
        return (
            <Container>
               <nav className="topmenubar">
                    <div className="d-flex flex-row">
                        <Form>
                            <div className="fleft">
                                {/*기간설정*/}
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
                            <th>올린날짜</th>
                            <th>판매금액</th>
                            <th>수량</th>
                            <th>상품이미지</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.goodsContents.map((item, i) =>
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
        this.goodsID = this.props.item.id
        this.state = {
            modalVisible: false, //상품 모달
            goodsFirstImageURI: '',
        }

    }

    componentDidMount() {
        this.callGetGoodsFirstImageAPI().then((response) => {
            this.setState({goodsFirstImageURI:URL.createObjectURL(response)})
        })
    }

    async callGetGoodsFirstImageAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImage?id=" + this.goodsID + "&position=1");
        let response = await manager.start();
        if (response.ok) {
            return response.blob();
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
                    <td><img height="100px" width="100px" src={this.state.goodsFirstImageURI} /></td>
                </tr>
                {
                    this.state.modalVisible === true && <GoodsDetailItem goodsID={this.goodsID} hideButtonClicked={() => { this.setState({ modalVisible: false }) }} /> 
                }
            </>
        )
    }
}

class GoodsDetailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsDetailContents: [],
            goodsImages: []
        }
    }
    componentDidMount() {
        this.callGetGoodsDetailAPI().then((response) => {
            this.setState({ goodsDetailContents: response });        
        })
        this.callImageLengthAPI().then((response) => {
            for(let i=1; i<=response.length;i++){
                this.callGetImageAPI(i).then((response) => {
                    const images=this.state.goodsImages;
                    images.push(URL.createObjectURL(response))
                    this.setState({goodsImages:images})
                });

            }
            
        })
        
    }
    async callGetGoodsDetailAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsDetail?login_id=3&id=" + this.props.goodsID);
        let response = await manager.start();
        if (response.ok)
            return response.json();
    }
    async callImageLengthAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImageLength?id=" + this.props.goodsID)
        let response = await manager.start();
        if (response.ok) {
            return response.json();
        }
    }
    async callGetImageAPI(position) {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImage?id=" + this.props.goodsID + "&position="+position);
        let response = await manager.start();
        if (response.ok) {
            return response.blob();
        }
    }
    render() {
     
        return (
            <div className="modal w-100 h-100">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>

                    <Modal.Body>
                        <Carousel interval={null}>
                            {this.state.goodsImages.map((item, i) => <Carousel.Item><img className="d-block w-100" src={item}/></Carousel.Item>)}
                        </Carousel>
                        <h5>판매글 정보</h5>
                        <p>id: {this.state.goodsDetailContents.id}</p>
                        <p>userID: {this.state.goodsDetailContents.userID}</p>
                        <p>name: {this.state.goodsDetailContents.name}</p>
                        <p>number: {this.state.goodsDetailContents.number}</p>
                        <p>price: {this.state.goodsDetailContents.price}</p>
                        <p>hashTag: {this.state.goodsDetailContents.hashTag}</p>
                        <p>quantity: {this.state.goodsDetailContents.quantity}</p>
                        <p>genuine: {this.state.goodsDetailContents.genuine}</p>
                        <p>spec: {this.state.goodsDetailContents.spec}</p>
                        <p>valid: {this.state.goodsDetailContents.valid}</p>
                        <p>removeFlag: {this.state.goodsDetailContents.removeFlag}</p>
                        <p>registerDate: {this.state.goodsDetailContents.registerDate}</p>

                    </Modal.Body>
                </Modal.Dialog>


            </div>
        )
    }
}