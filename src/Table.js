import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/button/Button.jsx'
import Cartes from "./componant/carte/Cartes";
import Game from './componant/Play/Game.jsx'
import {rndCarte,transformCardIntoInt} from "../src/utils/cardsUtils.js"


class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      premierLance: "yes",
      endGame: false,
      nameOfWinner: ""
    }
  }

  onClickStop = () => {
    const cardSelectedDealer = rndCarte()
    const cardSelectedDealer2 = rndCarte()

    const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = rndCarte()
      const valueCarteDealer = transformCardIntoInt(cardSelectedDealer.split("")[0])

      cardsDealer.push(cardSelectedDealer)

      dealerValue += valueCarteDealer

      if (dealerValue > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }

        break;
      }
    }
    if (dealerValue <= 21) {
      if (this.state.counterPlayer > 21) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else if (this.state.counterPlayer < dealerValue) {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Dealer"
        }
      } else {
        endGameAndWinner = {
          endGame: true,
          nameOfWinner: "Player"
        }
      }
    }

    console.log("update state on stop");

    this.setState({
      counterDealer: dealerValue,
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }

  onClickGive = () => {
    const cardSelected = rndCarte()
    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    this.setState({
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
  }

 
  startGame = () => {
    const cardSelected = rndCarte()
    const cardSelected2 = rndCarte()

    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]

    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

  render() {
    if (this.state.startGame == false) {
      return (
        <Game startGame={this.startGame} />
      )
    } else {
      return (<div>

        <div className="playGame">
          <div style={{ height: '100vh', position: 'relative' }}>
            <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>
            <Cartes key={"dealer"} cardList={this.state.dealerCardList} />
            {this.state.endGame && (<div className='winlost'>
              <h1>Winner is {this.state.nameOfWinner}</h1>
            </div>)}
            <Cartes key={"player"} cardList={this.state.playerCardList} />

            <div style={{ bottom: '20px', position: 'absolute' }} className="row col-6 offset-3 flex d-flex justify-content-between">
              <div className="d-grid gap-2">
                <Button
                  onClick={this.onClickGive}
                  classe="btn btn-outline-warning btn-lg rounded-pill"
                  color="white"
                  bcolor="#0d6efd"
                  name="Give"
                />
              </div>
              <div>
              </div>
              <div className="d-grid gap-2">
                <Button
                  onClick={this.onClickStop}
                  classe="btn btn-outline-warning btn-lg rounded-pill"
                  color="white"
                  bcolor="#dc3545"
                  name="Stop"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
      )
    }
  }
}

export default Table;

