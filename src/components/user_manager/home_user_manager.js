import React, { Component } from "react";
import { Container, Table} from "react-bootstrap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import WebServiceManager from "../../util/webservice_manager";
import Constant from "../../util/constant_variables";
import PageHeader from "../../util/page_header";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModalUserDetail from '../user_manager/modal_user_detail';
import ModalUserRegister from '../user_manager/modal_user_register'

export default class UserManager extends Component {
    constructor(props) {
        super(props);
        this.contents = [];
        this.state = {
            userRegisterModalVisible: false,
            approval: '', //승인여부 드롭박스 2:전체 , 0:승인됨 , 1:승인안됨
            sale: '', //판매건수 드롭박스 2:전체, max:높은순, min:낮은순
            userContents: [], //회원정보데이터
            date: 0,  // 0: 설정x, 1:today, 2:week, 3:month
            dateRange: [] //기간 범위
        }
    }

    componentDidMount() {
        this.callGetUsersAPI().then((response) => {
            console.log('user', response)
            this.setState({ userContents: response })
        })


    }

    //회원 정보 가져오는 API
    async callGetUsersAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetUsers", "post");
        manager.addFormData("data", { userID: 28, passwd: "9999" });
        let response = await manager.start();
        if (response.ok)
            return response.json();

    }

    //승인여부에 관한 드롭박스 아이템 선택시 value값을 받아오는 핸들러
    //테이블 새로 불러올때 사용예정
    //아이템이 새로 선택될때 이벤트가 발생하여 approval 값을 갱신해줌
    approvalHandleChange = (e) => {
        console.log(e)
        this.setState({ approval: e.target.value })
    }

    //판매것수에 관한 드롭박스 아이템 선택시 value값을 받아오는 핸들러
    //테이블 새로 불러올때 사용예정
    //아이템이 새로 선택될때 이벤트가 발생하여 sale 값을 갱신해줌
    salelHandleChange = (e) => {
        console.log(e)
        this.setState({ sale: e.target.value })
    }
    //기간설정리스너
    onDateListener = (date) => {
        console.log('date', date)
        this.setState({ dateRange: [], date: date });
    }
    onDateRangeListener = (dates) => {
        console.log('dateRange', dates[0])
        this.setState({ dateRange: dates, date: 0 });
    }

    render() {
        console.log('approval', this.state.approval)
        console.log('sale', this.state.sale)
        return (
            <div>
                {/* 서브탑메뉴바 영역 */}
                <Container>
                    <nav className="topmenubar">
                        <div className="d-flex topmenubar">
                            <Box style={{ marginRight: '15px' }} sx={{ minWidth: 190 }} >
                                <FormControl fullWidth>
                                    <InputLabel>승인여부</InputLabel>
                                    <Select
                                        value={this.state.approval}
                                        label="승인여부"
                                        onChange={this.approvalHandleChange}
                                    >
                                        <MenuItem value={2}>전체</MenuItem>
                                        <MenuItem value={0}>승인됨</MenuItem>
                                        <MenuItem value={1}>승인안됨</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* 승인됨을 클릭한 경우만 판매건수 콤보박스 활성화 */}
                            {this.state.approval === 0 &&
                                <Box style={{ marginRight: '15px' }} sx={{ minWidth: 190 }}>
                                    <FormControl fullWidth>
                                        <InputLabel>판매건수</InputLabel>
                                        <Select
                                            value={this.state.sale}
                                            label="판매건수"
                                            onChange={this.salelHandleChange}
                                        >
                                            <MenuItem value={2}>전체</MenuItem>
                                            <MenuItem value={'max'}>높은순</MenuItem>
                                            <MenuItem value={'min'}>낮은순</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            }
                            <button className="darknavy" onClick={() => { this.setState({ userRegisterModalVisible: true }) }}><PersonAddIcon /></button>
                        </div>


                        <PageHeader onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} />
                        {
                            this.state.userRegisterModalVisible === true ? <ModalUserRegister hideButtonClicked={() => { this.setState({ userRegisterModalVisible: false }) }} /> : null
                        }

                    </nav>

                    {/* 테이블 영역 */}
                    <Table hover>
                        <thead>
                            <tr>
                                <th>상호</th>
                                <th>사업자번호</th>
                                <th>전화번호</th>
                                <th>가입일시</th>
                                <th>주소</th>
                                <th>가입승인</th>
                                <th>판매건수</th>
                            </tr>
                        </thead>
                        {/* 튜플영역을 map을 사용하여 하나씩 받아와 뿌려주도록 구성함 */}
                        <tbody>
                            {this.state.userContents.map((item, i) => <UserManagerItems item={item} key={i} />)}
                        </tbody>
                    </Table>


                </Container>
            </div>



        );
    }
}


//--------------------------------------------------------------------------------------------------------
// 테이블에 데이터를 뿌려주는 클래스
class UserManagerItems extends Component {
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
                    <td>{item.id}</td>
                    <td>{item.companyNo}</td>
                    <td>{item.phone}</td>
                    <td>{item.registerDate}</td>
                    <td>{item.validate}</td>
                    {/* 0:승인됨, 1:승인안됨 */}
                    {item.validate === 0
                        ? (<td>O</td>)
                        : (<td>X</td>)
                    }
                    <td>{item.sale}</td>
                </tr>
                {
                    this.state.modalVisible === true ? <ModalUserDetail item={item} hideButtonClicked={() => { this.setState({ modalVisible: false }) }} /> : null
                }

            </>

        )

    }
}