import React, { Component } from 'react'
import './styles/Card.css'

export default class Card extends Component {
    constructor(props){
        super(props) 
        let angle  = Math.random()*90 -45;
        let xPosition = Math.random()*40 -20;
        let yPosition = Math.random()*40 - 20;
        this._transform = `translate(${xPosition}px , ${yPosition}px) rotate(${angle}deg)`;
    }
    render() {
        return (
            <div>
                <img style={{ transform: this._transform }} className="Card" src={this.props.image} alt={this.props.name}></img>
            </div>
        )
    }
}
