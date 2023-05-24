import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import WebServiceManager from "../util/webservice_manager";
import Constant from "../util/constant_variables";
import DateSelect from "../util/date_select";
import PageHeader from "../util/page_header";

import CompanyNoImage from "../images/companyNo.png";
import NameCardImage from "../images/nameCard.png";

import PersonAddIcon from '@mui/icons-material/PersonAdd';

//회원관리 페이지 클래스
export default class UserInfo extends Component {
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


                        <PageHeader />
                        {
                            this.state.userRegisterModalVisible === true ? <UserRegisterModal hideButtonClicked={() => { this.setState({ userRegisterModalVisible: false }) }} /> : null
                        }

                    </nav>

                    {/* 테이블 영역 */}
                    <Table bordered hover>
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
                            {this.state.userContents.map((item, i) => <UserInfoItems item={item} key={i} />)}
                        </tbody>
                    </Table>


                </Container>
            </div>



        );
    }
}


//--------------------------------------------------------------------------------------------------------
// 테이블에 데이터를 뿌려주는 클래스
class UserInfoItems extends Component {
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
                    this.state.modalVisible === true ? <UserDetailModal item={item} hideButtonClicked={() => { this.setState({ modalVisible: false }) }} /> : null
                }

            </>

        )

    }
}

//--------------------------------------------------------------------------------------------------------
//UserInfo 상세보기 모달 클래스
class UserDetailModal extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.item.id
        this.state = {
            companyNoImageURI: '', //companyNoImageURI:사업자등록증 사진
            cardImageURI: '' //cardImageURI:명함 사진
        }
    }
    approve = () => {
        alert('알림문자를 보냈습니다.')
    }

    componentDidMount() {
        this.callGetCompanyImageAPI().then((response) => {
            this.setState({ companyNoImageURI: URL.createObjectURL(response) })
        })
        this.callGetcardImageAPI().then((response) => {
            this.setState({ cardImageURI: URL.createObjectURL(response) })
        })
    }


    //사업자등록증 사진을 가져오는 API
    async callGetCompanyImageAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetCompanyImage", "post");
        manager.addFormData("data", { userID: 28, passwd: "9999", id: this.id });//열람하고자 하는 id
        let response = await manager.start();
        if (response.ok) {
            return response.blob();
        }
    }

    //명함 사진을 가져오는 API
    async callGetcardImageAPI() {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetNamecardImage", "post");
        manager.addFormData("data", { userID: 28, passwd: "9999", id: this.id });//열람하고자 하는 id
        let response = await manager.start();
        if (response.ok) {
            return response.blob();
        }
    }

    render() {
        const item = this.props.item;
        return (
            <div className="modal w-100 h-100" >

                <Modal.Dialog
                    size="lg"
                    centered>
                    <Modal.Header>
                        <Modal.Title>상세보기</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>

                    <Modal.Body>

                        <Carousel interval={null}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100" height={'450px'}
                                    src={this.state.companyNoImageURI}
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100" height={'450px'}
                                    src={this.state.cardImageURI}
                                />
                            </Carousel.Item>
                        </Carousel>

                        <div className="topmenubar">
                            <table className="w-100">
                                <tr>
                                    <td><p><strong>이름</strong></p></td>
                                    <td><p>{item.username}</p></td>
                                </tr>
                                <tr>
                                    <td><p><strong>사업자번호</strong></p></td>
                                    <td><p>{item.companyNo}</p></td>
                                </tr>
                                <tr>
                                    <td><p><strong>전화번호</strong></p></td>
                                    <td><p>{item.phone}</p></td>
                                </tr>
                                <tr>
                                    <td><p><strong>가입일시</strong></p></td>
                                    <td><p>{item.registerDate}</p></td>
                                </tr>
                                <tr>
                                    <td> <p><strong>주소</strong></p></td>
                                    <td><p>{item.address}</p></td>
                                </tr>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {item.validate == 1 && <Button variant="primary" onClick={() => { this.approve() }}>승인</Button>}
                        <Button variant="primary" onClick={() => { this.approve() }}>수정</Button>
                        <Button variant="danger" onClick={() => { this.approve() }}>탈퇴</Button>
                    </Modal.Footer>
                </Modal.Dialog>


            </div>
        )
    }
}

//--------------------------------------------------------------------------------------------------------
//회원정보 등록 모달 클래스
class UserRegisterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyNo: '', //사업자등록 번호
            companyName: '', //회사상호명
            companyAddress: '', //사업자 주소
            passwd: '',     //비밀번호
            passwdOk: '', //비밀번호 확인
            companyNoImageURI: '', //사업자 등록증 사진
            nameCardImageURI: '', //명함 사진
            registerButtonVisible:false, //회원등록 버튼 활성화 체크변수
        }

    }

    //회원등록 활성화 함수
    onValueChange=(value)=>{
        this.setState(value,()=>{
            let isValidForm=true;

            if(this.state.companyNo.trim().replaceAll("-","").length < 10) // 조건 필요시 추가
                isValidForm=false;
            if(this.state.passwd.trim().length == 0)
                isValidForm=false;     
            if(this.state.passwdOk!=this.state.passwd)
                isValidForm=false;
            if(this.state.companyAddress.trim().length==0)
                isValidForm=false;
            if(this.state.companyName.trim().length==0)
                isValidForm=false;
            if((this.state.companyNoImageURI==undefined)||((this.state.companyNoImageURI=="")))
                isValidForm=false;
            if((this.state.nameCardImageURI==undefined)||(this.state.nameCardImageURI==""))
                isValidForm=false;

            this.setState({registerButtonVisible:isValidForm})
        })

    }

    goAddUser = () => {
        this.callAddUserAPI().then((response) => {
            console.log('adduser', response);
            if (response.success == 0) {
                alert("이미 있는 사업자번호입니다");
            }
            else if (response.success == -1) {
                alert("서버 오류로 회원가입에 실패했습니다.");
            }
            else {
                alert('가입 신청 완료', '입력 된 내용 확인 후 승인이 완료됩니다.');
                this.props.hideButtonClicked()

            }
        })

    }
    addCompanyNoImage = (value) => {
        
        this.setState({ companyNoImageURI: value }, () => {
            console.log(value)
            if(this.state.companyNoImageURI){
                this.goCompanyInfo(this.state.companyNoImageURI)
            }
            this.onValueChange()
        })
    }
    addNameCardImage =(value)=>{
        
        this.setState({nameCardImageURI:value},()=>{
            console.log(value)
            this.onValueChange()
        })
    }
    goCompanyInfo(imageURI) {
        this.callCompanyInfoAPI(imageURI).then((response) => {
            if (response.success == 0) {
                alert('사업자 인식 실패')
            }
            else
                this.setState({ companyNo: response.no, companyName: response.name, companyAddress: response.address })
        })
    }

    //회원정보 서버에 등록 API
    async callAddUserAPI() {
        const userData = {
            companyNo: this.state.companyNo.replace(/-/g, ''),
            companyName: this.state.companyName,
            companyAddress: this.state.companyAddress,
            passwd: this.state.passwd
        };


        let manager = new WebServiceManager(Constant.serviceURL + "/AddUser", "post");
        manager.addFormData("data", userData);
        manager.addBinaryData("file1", this.state.companyNoImageURI); //사업자 등록증 이미지
        manager.addBinaryData("file2", this.state.nameCardImageURI); //명함 이미지


        console.log(userData);
        let response = await manager.start();
        if (response.ok) {
            return response.json();
        }
    }
    //사업자 등록증 이미지로 텍스트 분석하여 상호, 사업자번호, 소재지 가져오기
    async callCompanyInfoAPI(imageData) {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetCompanyInfo", "post");
        manager.addBinaryData("file", imageData);
        let response = await manager.start();
        if (response.ok) {
            return response.json();
        }
    }



    render() {

        return (
            <div className="modal w-100 h-100" >

                <Modal.Dialog
                    size="lg"
                    centered>
                    <Modal.Header>
                        <Modal.Title>회원등록</Modal.Title>
                        <CloseButton onClick={this.props.hideButtonClicked} />
                    </Modal.Header>
                    {/* 이미지 프리뷰 할지 고민중 */}
                    <Modal.Body>
                        <div className="w-50 fleft">
                            <Carousel interval={null}>
                                <Carousel.Item>
                                    <img

                                        className="d-block w-100" height={'600px'}
                                        src={this.state.companyNoImageURI ? URL.createObjectURL(this.state.companyNoImageURI) : CompanyNoImage}
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100" height={'600px'}
                                        src={this.state.nameCardImageURI ? URL.createObjectURL(this.state.nameCardImageURI) : NameCardImage}
                                    />
                                </Carousel.Item>

                            </Carousel>
                            {/* 이미지 파일 업로드 */}
                            <div className="w-100">
                                <input type="file" className="w-50 fleft" onChange={(e) => { this.addCompanyNoImage(e.target.files[0]) }} />
                                <input type="file" className="w-50 fleft" onChange={(e) => { this.addNameCardImage( e.target.files[0] ) }} />
                            </div>
                        </div>

                        <div className="w-50 fleft" style={{ justifyContent: 'center' }} >
                            <form>
                                {/* 회원정보 입력 */}
                                <div className="background" >
                                    <label>사업자등록 번호</label>
                                    <Form.Control
                                        type='text' value={this.state.companyNo} onChange={(e) => { this.onValueChange({ companyNo: e.target.value})}}
                                    />
                                </div>
                                <div className="background" >
                                    <label>상호명</label>
                                    <Form.Control
                                        type='text' value={this.state.companyName} onChange={(e) => { this.onValueChange({ companyName: e.target.value})}}
                                    />
                                </div>
                                <div className="background" >
                                    <label>사업자 주소</label>
                                    <Form.Control
                                        type='text' value={this.state.companyAddress} onChange={(e) => { this.onValueChange({ companyAddress: e.target.value}) }}
                                    />
                                </div>
                                <div className="background" >
                                    <label>비밀번호</label>
                                    <Form.Control
                                        type='password' value={this.state.passwd} onChange={(e) => { this.onValueChange({ passwd: e.target.value}) }}
                                    />
                                </div>
                                <div className="background" >
                                    <label>비밀번호 확인</label>
                                    <Form.Control
                                        type='password' value={this.state.passwdOk} onChange={(e) => { this.onValueChange({ passwdOk: e.target.value}) }}
                                    />
                                    {this.state.passwdOk !== this.state.passwd && <div className="errorMessage">비밀번호가 다릅니다</div>}
                                </div>
                            </form>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.registerButtonVisible==true ?<Button variant="primary" onClick={this.goAddUser} >회원등록</Button>:<Button variant="secondary" >회원등록</Button>}
                        
                    </Modal.Footer>
                </Modal.Dialog>

            </div >

        )
    }
}