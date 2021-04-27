import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './componant/button/Button.jsx'
import Cartes from "./componant/carte/Cartes";
import StartGam from './componant/Play/StartGame.jsx'

// la liste des cartes 
const cardArray = [
  "KS", "QS", "JS", "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "0S",
  "KD", "QD", "JD", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "0D",
  "KH", "QH", "JH", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "0H",
  "KC", "QC", "JC", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "0C"];


let arrayLength = 0
let rndCarteTemp = "";
let rndNumTemp = 0;

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

  rndCarte() {
    arrayLength = + this.state.playerCardList.length;

    rndNumTemp = Math.floor(Math.random() * 53);

    if (rndNumTemp > 52) { rndNumTemp = rndNumTemp - 10 } else if (rndNumTemp < 1) { rndNumTemp = rndNumTemp + 10 }

    rndCarteTemp = cardArray[rndNumTemp - 1];

    return rndCarteTemp
  }


  // onClickStop est un methode qui declache le tours du courpier.
  //Au depars il prend alleatoirement deux cartes qu il stoque dans cardsDealer. 
  //IL prend la valleur de chaque carte pour faire la somme dans dealerValue.
  //si cette derniere est inferieur a 17, il prend automatiquement un autre carte.
  //si cette derniere est supperieur a 17, il change la valeur de endgame en true et le la valeur de nameOFWinner en player puis s'arret.
  //si cette derniere est entre 17 et 21 il le compare a la somme des cartes du joueur counterPlayer.
  //si cette counterPlayer est supperieur a 21, il change la valeur de endgame en true et le la valeur de nameOFWinner en dealer.
  //si cette counterPlayer est entre 17 et 21 et supperieur a dealerValue , il change la valeur de endgame en true et le la valeur de nameOFWinner en player,
  //dans le cas contraire, il change la valeur de endgame en true et le la valeur de nameOFWinner en dealer.


  onClickStop = () => {
    const cardSelectedDealer = this.rndCarte()
    const cardSelectedDealer2 = this.rndCarte()

    const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])
    const valueCarteDealer2 = this.transformCardIntoInt(cardSelectedDealer2.split("")[0])

    const cardsDealer = [cardSelectedDealer, cardSelectedDealer2]

    let dealerValue = valueCarteDealer + valueCarteDealer2

    let endGameAndWinner = {
      endGame: false,
      nameOfWinner: ""
    }

    while (dealerValue < 17) {
      const cardSelectedDealer = this.rndCarte()
      const valueCarteDealer = this.transformCardIntoInt(cardSelectedDealer.split("")[0])

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
    const cardSelected = this.rndCarte()
    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const totalPlayerValue = this.state.counterPlayer + valueCarte

    this.setState({
      counterPlayer: totalPlayerValue,
      playerCardList: [...this.state.playerCardList, cardSelected]
    })
  }
  //transformCardIntoInt est  une methode qui prend en parramettre cardValue et 
 // transforme le "K",le "Q", le"J", le "A" et les "0" des cartes en str de 10 et le retourne.
 // si la valeur de la cartte est un chiffre il retourne directement le chiffre en str.
  transformCardIntoInt(cardValue) {
    if (cardValue === "K" || cardValue === "Q" || cardValue === "J" || cardValue === "A" || cardValue === "0") {
      cardValue = "10"
    }

    return parseInt(cardValue)
  }

  // satrtGame est un methode qui declanche le je.
  //Au depars il prend alleatoirement deux cartes qu il stoque dans firstTwoCardsPlayer. 
  //IL prend la valleur de chaque carte pour faire la somme dans firstTwoCardsPlayer.
  startGame = () => {
    const cardSelected = this.rndCarte()
    const cardSelected2 = this.rndCarte()

    const valueCarte = this.transformCardIntoInt(cardSelected.split("")[0])
    const valueCarte2 = this.transformCardIntoInt(cardSelected2.split("")[0])

    const firstPlayerValue = valueCarte + valueCarte2

    const firstTwoCardsPlayer = [cardSelected, cardSelected2]
    //change les states 
    this.setState({
      counterPlayer: firstPlayerValue,
      playerCardList: firstTwoCardsPlayer,
      startGame: true
    })
  }

  render() {
    if (this.state.startGame == false) {
      return (
        <StartGam startGame={this.startGame} />
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

