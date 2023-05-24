import React, { Component } from "react";
import { Container, Button, Table, Carousel, Modal, CloseButton, Form } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import DateSelect from "./date_select";

export default class PageHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
     //기간설정리스너
     onDateListener = (date) => {
        console.log('date', date)
        this.setState({ dateRange: [], date: date });
    }
    onDateRangeListener = (dates) => {
        console.log('dateRange', dates)
        this.setState({ dateRange: dates, date: 0 });
    }
    render() {

        return (
               
                    <div className="d-flex flex-row">
                        <Form>
                            <div className="d-flex fleft">
                                <DateSelect onDateRangeListener={this.onDateRangeListener} onDateListener={this.onDateListener} />
                            </div>

                            <div className="d-flex fright" style={{marginLeft:'15px'}}>
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
        );
    }
}

