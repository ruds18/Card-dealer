import React, { Component } from 'react'
import axios from 'axios'
import Card from './Card';
import './styles/Deck.css'
const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";
export default class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            drawn: []
        }
        this.getCard = this.getCard.bind(this)
    }
    async componentDidMount() {
        let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
        this.setState({
            deck: deck.data
        });

    }

    async getCard() {
        let id = this.state.deck.deck_id;
        try {
            let card_Base_url = `${API_BASE_URL}/${id}/draw/`
            let cardRes = await axios.get(card_Base_url);
            if (!cardRes.data.success) {
                throw new Error("no card remaining . Please refresh the page ")
            } console.log(cardRes.data)
            let card = cardRes.data.cards[0];
            this.setState(st => ({
                drawn: [...st.drawn,
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}  `
                }]
            }))
        } catch (err) {
            alert(err)
        }


    }
    render() {
        const cards = this.state.drawn.map(card =>(
                <Card key={card.id} name={card.name} image={card.image} id={card.id}></Card>
        ))
        return (
            <div>
                <h1>Card Dealer!</h1>
                <button onClick={this.getCard}>Get Card</button>
                <div className="Deck_Card">{cards}</div>
                
            </div>
        )
    }
}
