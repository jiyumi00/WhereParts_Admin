import React, { Component } from "react";
import { Container, Table } from "react-bootstrap";
import PageHeader from "../../util/page_header";

import SalesDetailModal from "./modal_trans_detail";

import Pagenation2 from "../../util/pagenation2";

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        const today = new Date();

        this.oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
        this.oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));

        this.itemCountPerPage = 17; //한페이지당 보여질 리스트 갯수
        this.pageCountPerPage = 5;

        this.contents = []; //서버에서 가져온 원본 contents

        this.state = {
            modalVisible: false, //상품 모달

            selectList: ["배송전", "배송중", "배송완료", "거래완료"],
            selectValue: "배송전",
            transactionColmname: ["판매자", "품명", "구매자", "결제수단", "결제날짜", "주문번호"],
            filteredContents: [],

            selectedItemIndex: null,

            date: 0,  // 0: 설정x, 1:today, 2:week, 3:month
            dateRange: [], //기간 범위

            currentPage: 1,      // 현재 페이지 (setCurrentPage()에서 변경됨)
            offset: 0            //현재페이지에서 시작할 item index
        }
    }
    componentDidMount() {
        this.contents = [{
            userID: "배송전 판매자",
            name: "품명",
            registerDate: "2020-05-30",
            price: 10000,
            quantity: 1
        }];

        this.setState({ filteredContents: this.dataFiltering(0) });

    }

    //프로젝트 리스트에서 하나의 아이템을 선택하면 DetailPopup창을 띄우고 현재 선택된 아이템의 index 설정
    setItemIndex = (index) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            selectedItemIndex: index
        });
    }

    //기간설정에 따른 데이터필터링
    dataFiltering(date) {

        let filteredContents = this.contents;

        if (date === 1) {
            filteredContents = filteredContents.filter((item) => {
                return new Date(item.registerDate) === this.today
            })

        }
        else if (date === 2) {
            console.log('일주일 전', this.oneWeekAgo)
            filteredContents = filteredContents.filter((item) => {
                return new Date(item.registerDate) >= this.oneWeekAgo
            })

        }
        else if (date === 3) {
            console.log('한달 전', this.oneMonthAgo)
            filteredContents = filteredContents.filter((item) => {
                return new Date(item.registerDate) >= this.oneMonthAgo
            })
        }
        return filteredContents
    }

    //Pagenation에서 몇페이지의 내용을 볼지 선택 (페이지를 선택하면 현재의 페이지에따라 offset 변경)
    setCurrentPage = (page) => {
        let lastOffset = (page - 1) * this.itemCountPerPage;
        this.setState({ currentPage: page, offset: lastOffset });
    };
    //기간설정리스너
    onDateListener = (date) => {
        console.log('date', date)
        this.setState({ filteredContentss: this.dataFiltering(date), })
    }
    onDateRangeListener = (dates) => {
        console.log('dateRange', dates)
        this.setState({ dateRange: dates, date: 0 });
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
                    <PageHeader onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} />
                </nav>
                {
                    this.state.modalVisible && <SalesDetailModal item={this.state.filteredContents[this.state.selectedItemIndex]} hideButtonClicked={this.setItemIndex} />
                }

                <Table hover style={{ marginBottom: 5 }} >
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
                            this.state.filteredContents.length > 0 && this.state.filteredContents.slice(this.state.offset, this.state.offset + this.itemCountPerPage).map((item, i) =>
                                <TransactionItem item={item} key={i} index={i} listener={this.setItemIndex} />)
                        }
                    </tbody>
                </Table>
                <footer className="w-100 p-2" style={{ textAlign: 'center' }}>
                    <Pagenation2 itemCount={1/*this.state.goodsContents.length*/} pageCountPerPage={this.pageCountPerPage} itemCountPerPage={this.itemCountPerPage} currentPage={this.state.currentPage} clickListener={this.setCurrentPage} />
                </footer>
            </Container>

        );
    }
}


class TransactionItem extends Component {
    constructor(props) {
        super(props);
    }
    onClickListener = () => {
        this.props.listener(this.props.index);
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
                <td>{item.quantity}</td>
            </tr>
        )
    }
}

