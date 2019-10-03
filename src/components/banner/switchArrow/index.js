import React, { Component } from 'react'
import './index.css'

import PropTyps from 'prop-types';
export default class SwitchArrow extends Component {

    static propTypes = {
        onChange:PropTyps.func
    }

    render() {
        return (
            <div className="arrow">
                <span className="left" onClick={ () => {
                    this.props.onChange && this.props.onChange('left') 
                } }>&lt;</span>
                <span className="right" onClick={ () =>{
                    this.props.onChange && this.props.onChange('right') 
                }}>&gt;</span>
            </div>
        )
    }
}
