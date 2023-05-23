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
            tab: false,
            contents: [],
            date:0,
            dateRange:[],
        }
    }
    componentDidMount() {
        this.callGetGoodsAPI().then((response) => {
            console.log('goods', response)
            this.setState({ contents: response });
        })
    }

    goGetGoods = () => {
        this.callGetGoodsAPI().then((response) => {
            this.setState({ buyContents: response, emptyListViewVisible: response.length == 0 ? true : false })
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
        this.goodsID = this.props.item.id
        this.state = {
            tab: false,
            goodsFirstImageURI: '',

        }

    }

    componentDidMount() {
        this.callGetGoodsFirstImageAPI().then((response) => {
            let reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () => {
                this.setState({ goodsFirstImageURI: reader.result });
            }
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
                <tr onClick={() => { this.setState({ tab: true }) }}>
                    <td>{item.userID}</td>
                    <td>{item.name}</td>
                    <td>{item.registerDate}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td><img height="100px" width="100px" src={this.state.goodsFirstImageURI} /></td>
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
        this.state = {
            modalcontents: [],
            goodsImages: []
        }
    }
    componentDidMount() {
        this.callGetGoodsDetailAPI().then((response) => {
            this.setState({ modalcontents: response });        
        })
        this.callImageLengthAPI().then((response) => {
            for(let i=1; i<=response.length;i++){
                this.callGetImageAPI(i).then((response) => {
                    console.log('response',response)
                    
                    let reader=new FileReader();
                    reader.readAsDataURL(response);
                    reader.onloadend=()=>{
                        const images=this.state.goodsImages;
                        images.push(reader.result.replace("application/octet-stream", "image/jpeg"));
                        this.setState({goodsImages:images})
                        console.log('images',images)
                    }
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
                            {this.state.goodsImages.map((item, i) => <Carousel.Item><img className="d-block w-100" src={item}/></Carousel.Item>)}
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