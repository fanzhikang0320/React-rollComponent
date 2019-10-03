import React, { Component } from 'react'
import './index.css';

import PropTypes from 'prop-types';

import ImgContainer from './imgContainer'

import SwitchArrow from './switchArrow'

import SwitchDot from './switchDot'

export default class Banner extends Component {

    //设置默认值
    static defaultProps = {
        height:280,
        width:520,
        imgSrcs:[],
        autoDuration:3000,
        duration:1000
    }

    static propTypes = {
        width:PropTypes.number.isRequired,//容器的宽度
        height:PropTypes.number.isRequired,//容器的高度
        imgSrcs:PropTypes.arrayOf(PropTypes.string).isRequired,//图片路径
        autoDuration:PropTypes.number.isRequired,//自动切换的间隔时间
        duration:PropTypes.number.isRequired,//完成一次切换需要多长时间
    }

    state = {
        curIndex:0  //当前显示的第几张
    }

    timer = null;

    /**
     * 自动轮播
     */
    autoSwitch () {
        clearInterval(this.timer);
        this.timer = setInterval(() =>{
            let cur = this.state.curIndex;
            cur = (cur + 1) % this.props.imgSrcs.length;
            this.handleSwitch(cur);
        },this.props.autoDuration)
    }
    componentDidMount () {
        this.autoSwitch();
    }

    componentWillUnmount () {
        clearInterval(this.timer);
    }
    /**
     * 获取ImgContainer组件对象，用于获取该组件上的方法
     */
    imgContainerRef = el => {
        this.imgContainer = el;
    }

    /**
     * 调用组件内的方法，传入图片索引，展示相应的图片
     */
    handleSwitch = (index) => {
        this.setState({
            curIndex:index
        })
        this.imgContainer.switchTo(index);
    }

    handleArrowChange = (type) => {
        let cur = this.state.curIndex;
        if (type === 'left') {
            cur--;
            if (cur < 0) {
                cur = this.props.imgSrcs.length - 1;
            }
        } else if (type === 'right') {
            cur++;
            if (cur > this.props.imgSrcs.length - 1) {
                cur = 0;
            }
        }
        console.log(cur,this.props.imgSrcs.length)
        this.handleSwitch (cur);
    }

    render() {
        return (
            <div className="banner-container"
                style={{
                    width:this.props.width,
                    height:this.props.height
                }}
                onMouseEnter = {() => {
                    clearInterval(this.timer);
                }}
                onMouseLeave = { () => {
                    this.autoSwitch();
                }}
            >
               <ImgContainer 
               imgSrcs={this.props.imgSrcs} 
               imgWidth={this.props.width} 
               imgHeight={this.props.height}
               duration={this.props.duration}
                
               ref = {this.imgContainerRef}
               />

               <SwitchArrow 
               onChange={this.handleArrowChange}
               
               />

               <SwitchDot 
               total={this.props.imgSrcs.length}
               curIndex={this.state.curIndex}
               onChange={this.handleSwitch}
               
               />
            </div>
        )
    }
}
