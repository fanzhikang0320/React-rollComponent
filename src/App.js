import React, { Component } from 'react'

import Banner from './components/banner';

import src1 from './components/banner/img/1.jpg';
import src2 from './components/banner/img/2.jpg';
import src3 from './components/banner/img/3.jpg';


export default class App extends Component {


    render() {
        return (
                <Banner imgSrcs={[src1,src2,src3]} duration={1000}/>
        )
    }
}
