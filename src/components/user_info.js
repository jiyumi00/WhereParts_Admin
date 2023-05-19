import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form} from "react-bootstrap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import WebServiceManager from "../util/webservice_manager";



export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.contents = [];
        this.state = {
            tab: false,
            //approval:승인여부, sale:판매건수, contents:샘플 데이터
            approval: '',
            sale: '',
            contents: [
                {
                    username: '강수민',
                    id: '1234',
                    phone: '010-1234-1234',
                    signupdate: '2020-03-02',
                    address: '김해시',
                    approval: 1,
                    sale: 0
                },
                {
                    username: '홍길동',
                    id: '1234',
                    phone: '010-1234-1234',
                    signupdate: '2020-03-02',
                    address: '창원시',
                    approval: 0,
                    sale: 0
                },
                {
                    username: '양배추',
                    id: '1234',
                    phone: '010-1234-1212',
                    signupdate: '2020-03-02',
                    address: '울산시',
                    approval: 1,
                    sale: 0
                }
            ]
        }
    }

    componentDidMount() {
        this.callGetUsersAPI().then((response)=>{
            console.log('user',response)
        })

        this.callGetGoodsAPI().then((response)=>{
            console.log('goods',response)
        })

        console.log('........................................');
    }

    async callGetUsersAPI() {
        let manager = new WebServiceManager("http://203.241.251.177/wparts/GetUsers","post");
        manager.addFormData("data",{userID:28,passwd:"9999"});
        let response = await manager.start();
        if(response.ok)
            return response.json();

    }

    async callGetGoodsAPI() {
        let manager = new WebServiceManager("http://203.241.251.177/wparts/GetGoods?login_id=1");
        let response = await manager.start();
        if(response.ok)
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


    render() {
        console.log('approval', this.state.approval)
        console.log('sale', this.state.sale)
        return (
            <div>
                {/* 드롭박스 영역 */}
                <Container>
                    
                    <Box className="d-flex topmenubar fleft" sx={{ minWidth: 200}} style={{marginBottom:'0px'}}>
                        <FormControl fullWidth>
                            <InputLabel /*id="demo-simple-select-label"*/>승인여부</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                value={this.state.approval}
                                label="승인여부"
                                onChange={this.approvalHandleChange}
                            >
                                <MenuItem value={2}>전체</MenuItem>
                                <MenuItem value={0}>승인안됨</MenuItem>
                                <MenuItem value={1}>승인됨</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                   
                   {/* 승인됨을 클릭한 경우만 판매건수 콤보박스 활성화 */}
                   {this.state.approval==1 && 
                   <Box className="d-flex topmenubar fleft" sx={{ minWidth: 200}} style={{marginBottom:'0px',marginLeft:'15px'}}>
                        <FormControl fullWidth>
                            <InputLabel /*id="demo-simple-select-label"*/>판매건수</InputLabel>
                            <Select
                                //labelId="demo-simple-select-label"
                                //id="demo-simple-select"
                                value={this.state.sale}
                                label="판매건수"
                                onChange={this.salelHandleChange}
                            >
                                <MenuItem value={2}>전체</MenuItem>
                                <MenuItem value={'max'}>높은순</MenuItem>
                                <MenuItem value={'min'}>낮은순</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>}
                    
                    <Form className="d-flex topmenubar fright" >
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            className="searchinput"
                        />
                       <button className="searchbutton darknavy"><SearchIcon /></button>
                    </Form>
                </Container>

                {/* 테이블 영역 */}
                <div>
                    <Container>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>이름</th>
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
                                {this.state.contents.map((item, i) => <UserInfoItems item={item} key={i} />)}
                            </tbody>
                        </Table>
                        

                    </Container>
                </div>
            </div>



        );
    }
}

// 데이터를 뿌려주는 클래스
class UserInfoItems extends Component {
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
                    <td>{item.username}</td>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.signupdate}</td>
                    <td>{item.address}</td>
                    {/* 0:승인안됨, 1:승인됨 */}
                    {item.approval === 0
                        ? (<td>X</td>)
                        : (<td>O</td>)
                    }
                    <td>{item.sale}</td>
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
                        <p>이름 : {item.username}</p>
                        <p>사업자 번호 : {item.id}</p>
                        <p>전화번호 : {item.phone}</p>
                        <p>가입일시 : {item.signupdate}</p>
                        <p>주소 : {item.address}</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={() => { this.approve() }}>수정</Button>
                        <Button variant="danger" onClick={() => { this.approve() }}>탈퇴</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}