import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";

import PageHeader from "../util/page_header";
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
                  <PageHeader/>

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
                    <td width="100px"><img height="50px" width="50px" src={this.state.goodsFirstImageURI} /></td>
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
            <div className="modal w-100">
                <Modal.Dialog  
                size="lg"
                centered>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>

                    <Modal.Body>
                        <Carousel interval={null}>
                            {this.state.goodsImages.map((item, i) => <Carousel.Item><img className="d-block w-100" height={'450px'} src={item}/></Carousel.Item>)}
                        </Carousel>
                        <div className="topmenubar">
                            <table className="w-100">
                                <tr>
                                    <td><p><strong>id</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.id}</p></td>
                                    <td><p><strong>userID</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.userID}</p></td>
                                </tr>
                                <tr>
                                    <td><p><strong>name</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.name}</p></td>
                                    <td><p><strong>number</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.number}</p></td>
                                </tr>
                                <tr>
                                    <td> <p><strong>price</strong></p></td>
                                    <td><p> {this.state.goodsDetailContents.price}</p></td>
                                    <td> <p><strong>hashTag</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.hashTag}</p></td>
                                </tr>
                                <tr>
                                    <td> <p><strong>quantity</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.quantity}</p></td>
                                    <td> <p><strong>genuine</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.genuine}</p></td>
                                </tr>
                                <tr>
                                    <td> <p><strong>spec</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.spec}</p></td>
                                    <td> <p><strong>valid</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.valid}</p></td>
                                </tr>
                                <tr>
                                    <td> <p><strong>removeFlag</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.removeFlag}</p></td>
                                    <td> <p><strong>registerDate</strong></p></td>
                                    <td><p>{this.state.goodsDetailContents.registerDate}</p></td>
                                </tr>
                            </table>
                        </div>

                    </Modal.Body>
                </Modal.Dialog>


            </div>
        )
    }
}