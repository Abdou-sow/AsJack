import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/button/Button.jsx'
import Cartes from "./componant/carte/Cartes";
import Game from './componant/Play/Game.jsx'
import {rndCarte,transformCardIntoInt} from "../src/utils/cardsUtils.js"

const cardArray = [


class Table extends React.Component {
  constructor() {
    super();

    this.state = {
      counterPlayer: 0,
      counterDealer: 0,
      playerCardList: [],
      dealerCardList: [],
      startGame: false,
      endGame: false,
      lose:false,
      nameOfWinner: ""
    }
  }

    arrayLength = + this.state.playerCardList.length;
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

    // change les states a la fin 
    this.setState({
      counterDealer: dealerValue, 
      dealerCardList: cardsDealer,
      nameOfWinner: endGameAndWinner.nameOfWinner,
      endGame: endGameAndWinner.endGame
    })
  }
// la methode onclickGive prend alleatoirement un carte pour le jouer et lajoute dans playerCardList et la valeur de la carte dans counterPlayer
  onClickGive = () => {
    const cardSelected = rndCarte()
    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte


    let endGamelose = {
      lose: false,
    }
    if (totalPlayerValue > 21) {
      endGamelose = {
        lose: true,
      }
    }

    this.setState({
      lose:endGamelose.lose,
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
    
  }
  transformCardIntoInt(cardValue) {
  startGame = () => {
    const cardSelected = rndCarte()
    const cardSelected2 = rndCarte()

    const valueCarte = transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]
    //change les states 
    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

<<<<<<< HEAD
  render() {
    if (this.state.startGame == false) {
      return (
        <StartGam startGame={this.startGame} />
      )
    } else {
      return (<div>

  renderGame() {
    return (
      <div>
        <div className="playGame">
          <div style={{ height: '100vh', position: 'relative' }}>
            <h1 style={{ color: '#feb236', textAlign: 'center' }}>Black Jack</h1>
            <div>
              <Cartes key={"dealer"} cardList={this.state.dealerCardList} />
            </div>
            {this.state.endGame && (<div className='winlost'>
              <h1>Winner is {this.state.nameOfWinner}</h1>
            </div>)}
            <div >
              <Cartes key={"player"} cardList={this.state.playerCardList} />
            </div>
            {this.state.lose && (<div className='winlost'>
              <h1>you lose hhh</h1>
            </div>)}
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
  render() {
    if (this.state.startGame == false) {
      return (
        <Game startGame={this.startGame} />
      )
    } else {
      return <div>
        {this.renderGame()}
      </div>
      
    }
  }
}

export default Table;

