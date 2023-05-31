import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import PageHeader from "../../util/page_header";
import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";

import Pagenation2 from "../../util/pagenation2";
import ModalGoodsDetail from "./modal_sale_detail";

export default class Sale extends Component {
    constructor(props) {
        
        super(props);
        var today=new Date();
        this.oneWeekAgo= new Date(today.setDate(today.getDate()-7));
        var today=new Date();
        this.oneMonthAgo=new Date(today.setMonth(today.getMonth()-1));

        this.itemCountPerPage = 11; //한페이지당 보여질 리스트 갯수
        this.pageCountPerPage = 5;

        this.contents = []; //서버에서 가져온 원본 contents

        this.state = {

            modalVisible: false, //상품 모달

            goodsContents: [],           //검색 결과 Contents
            selectedItemIndex: null,

            //date: 0,  // 0: 설정x, 1:today, 2:week, 3:month
            //dateRange: [], //기간 범위

            currentPage: 1,      // 현재 페이지 (setCurrentPage()에서 변경됨)
            offset: 0            //현재페이지에서 시작할 item index
        }
    }

    componentDidMount() {
        this.callGetGoodsAPI().then((response) => {
            this.contents = response;
            this.setState({ goodsContents: this.dataFiltering(0) });
        });

    }
    //기간설정에 따른 데이터필터링
    dataFiltering(date){
        
        let filteredContents=this.contents;
      
        if(date==1){
            filteredContents=filteredContents.filter((item)=>{
                return new Date(item.registerDate) == this.today
            }) 
            
        }
        else if(date==2){
            console.log('일주일 전',this.oneWeekAgo)
            filteredContents=filteredContents.filter((item)=>{
                return new Date(item.registerDate) >= this.oneWeekAgo
            }) 
            
        }
        else if(date==3){
            console.log('한달 전',this.oneMonthAgo)
           filteredContents=filteredContents.filter((item)=>{
             return new Date(item.registerDate) >= this.oneMonthAgo
           })
        }
        else if(date.length==2){
            filteredContents=filteredContents.filter((item)=>{
                return new Date(item.registerDate) >= date[0] && new Date(item.registerDate) <= date[1]
              })
        }
        return filteredContents
    }
    //프로젝트 리스트에서 하나의 아이템을 선택하면 DetailPopup창을 띄우고 현재 선택된 아이템의 index 설정
    setItemIndex = (index) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            selectedItemIndex: index
        });
    }


    //Pagenation에서 몇페이지의 내용을 볼지 선택 (페이지를 선택하면 현재의 페이지에따라 offset 변경)
    setCurrentPage = (page) => {
        let lastOffset = (page - 1) * this.itemCountPerPage;
        this.setState({ currentPage: page, offset: lastOffset });
    };


    //기간설정리스너
    onDateListener = (date) => {
        console.log('date', date)
        this.setState({goodsContents:this.dataFiltering(date),})
    }
    onDateRangeListener = (dates) => {
        console.log('dateRange', dates)
        this.setState({ goodsContents:this.dataFiltering(dates) });
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
                    <PageHeader onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} />

                </nav>
                {
                    this.state.modalVisible && <ModalGoodsDetail item={this.state.goodsContents[this.state.selectedItemIndex]} hideButtonClicked={this.setItemIndex} />
                }

                    <Table hover style={{ marginBottom: 5}}>
                        <thead>
                            <tr>
                                <th>판매자</th>
                                <th width={"20%"}>품명</th>
                                <th width={"20%"}>올린날짜</th>
                                <th>판매금액</th>
                                <th>수량</th>
                                <th>상품이미지</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.goodsContents.slice(this.state.offset, this.state.offset + this.itemCountPerPage).map((item, i) =>
                                    <SaleItem item={item} key={i} index={i} listener={this.setItemIndex} />)
                            }
                        </tbody>
                    </Table>

                    <footer className="w-100 p-2" style={{ textAlign: 'center' }}>
                        <Pagenation2 itemCount={100} pageCountPerPage={this.pageCountPerPage} itemCountPerPage={this.itemCountPerPage} currentPage={this.state.currentPage} clickListener={this.setCurrentPage} />
                    </footer>

            </Container>

        );
    }
}

class SaleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goodsFirstImageURI: '',
        }
    }
    componentDidMount() {
        this.callGetGoodsFirstImageAPI().then((response) => {
            this.setState({ goodsFirstImageURI: URL.createObjectURL(response) })
        })

    }
    onClickListener = () => {
        this.props.listener(this.props.index);
    }
    async callGetGoodsFirstImageAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetGoodsImage?id=" + this.props.item.id + "&position=1");
        let response = await manager.start();
        if (response.ok) {
            return response.blob();
        }
    }
    render() {
        const item = this.props.item;
        return (
            <tr onClick={this.onClickListener}>
                <td>{item.userID}</td>
                <td>{item.name}</td>
                <td>{item.registerDate}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td width="100px">
                    <img alt="" height="50px" width="50px" src={this.state.goodsFirstImageURI} />
                </td>
            </tr>
        )
    }
}
