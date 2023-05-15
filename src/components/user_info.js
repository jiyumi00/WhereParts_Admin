import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';


export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.contents = [];

        this.state = {
            contents:[
                {
                    username: '강수민',
                    id: '1234',
                    phone: '010-1234-1234',
                    signupdate: '2020-03-02',
                    address: '김해시',
                    approval: false,
                    sales: 0
                },
                {
                    username: '홍길동',
                    id: '1234',
                    phone: '010-1234-1234',
                    signupdate: '2020-03-02',
                    address: '창원시',
                    approval: false,
                    sales: 0
                }
            ]
            //IsOpen:false
        }
    }

    // toggleDropdown = () => {
    //     console.log("isopen")
    //     this.setState(!isopen);
    // }

    render() {
        return (
            <><div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    승인여부
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item" href="#">승인된</a></li>
                    <li><a class="dropdown-item" href="#">승인안됨</a></li>
                </ul>
            </div>
                <div>
                    <Container>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>사업자번호</th>
                                    <th>전화번호</th>
                                    <th>가입일시</th>
                                    <th>주소</th>
                                    <th>가입승인</th>
                                    <th>판매건수</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.contents.map((item, i) => <UserInfoItems item={item} key={i} />)}
                            </tbody>
                        </Table>
                    </Container>
                </div></>



        );
    }
}
class UserInfoItems extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const item = this.props.item;
        return (
            <>
                <tr>
                    <td>{item.username}</td>
                    <td>{item.id}</td>
                    <td>{item.phone}</td>
                    <td>{item.signupdate}</td>
                    <td>{item.address}</td>
                    <td>{item.approval}</td>
                    <td>{item.sales}</td>
                </tr>
            </>

        )

    }
}