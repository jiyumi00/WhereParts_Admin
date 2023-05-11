import React, {Component} from 'react';

import TopTemplate from './top';
import MenuTemplate from './side_menu_bar';

export default class Template extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <TopTemplate/>
                <MenuTemplate/>
                
                <div class="main">{this.props.children}</div>
            </div>
        );
    }
}