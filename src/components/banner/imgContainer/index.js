import React, { Component } from 'react'

import PropTypes from 'prop-types';

/**
 * 图片容器组件
 */
export default class ImgCotainer extends Component {

    static propTypes = {
        imgSrcs:PropTypes.arrayOf(PropTypes.string),
        imgWidth:PropTypes.number.isRequired,
        imgHeight:PropTypes.number.isRequired,
        duration:PropTypes.number.isRequired
    }

    containerRef = el => {
        this.div = el;
    }

    tick = 16;  //计时器间隔时间
    timer = null;   //计时器

    /**
     * 切换到第几张图片
     * 调用该函数，此组件会经过一段动画完成切换
     * @param {*} index 图片下标
     */
    switchTo (index) {
        //判断是否为正确的值
        if (index < 0) {
            index = 0;
        } else if (index > this.props.imgSrcs.length - 1) {
            index = this.props.imgSrcs.length - 1;
        }

        //根据index计算div最终的margin-left值

        const targetLeft = - index * this.props.imgWidth;

        //得到当前的marginLeft
        let curLeft = parseFloat(getComputedStyle(this.div).marginLeft);
        //得到总共要运动的次数
        const times = Math.ceil(this.props.duration / this.tick);
        //记录当前运动的次数
        let curTimes = 0;

        // 计算总的运动的距离
        const totalDis = targetLeft - curLeft;
        //计算每次要运动的距离
        const dis = totalDis / times;

        //先清除之前的计时器
        clearInterval(this.timer);

        this.timer = setInterval ( () => {
            curTimes++;
            curLeft += dis;
            this.div.style.marginLeft = curLeft + 'px';
            // 如果当前的运动次数等于要运动的次数，清除定时器
            if (curTimes === times) {
                this.div.style.marginLeft = targetLeft + 'px';
                clearInterval(this.timer);
            }
        },this.tick) 

    }

    render() {
        //根据路径进行生成React对象，并设置宽高，防止传进来的图片大小不一
        const imgs = this.props.imgSrcs.map( (src,index) => <img src={src} alt="" key={index} style={{
            width:this.props.imgWidth,
            height:this.props.imgHeight,
            float:"left"
        }} />)

        return (
            <div style={{
                width:this.props.imgSrcs.length * this.props.imgWidth,
                height:this.props.imgHeight
            }}
            ref={this.containerRef}
            >
                {imgs}
            </div>
        )
    }
}
