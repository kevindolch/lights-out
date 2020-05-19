import React from 'react';
import '../styles/LightsOut.scss';

const ROW_MAP = {
  "00111": [3],
  "01010": [1,4],
  "01101": [0],
  "10001": [3,4],
  "10110": [4],
  "11011": [2],
  "11100": [1]
}

export default class LightsOut extends React.Component {
  static populateGrid() {
    return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.round(Math.random())));
  }

  constructor(props) {
    super(props);
    this.state = {
      lights: this.constructor.populateGrid(),
      moveCount: 0,
      activeCells: 0,
      unsolvable: false,
      botActive: false
    }
    this.state.activeCells = this.state.lights.reduce((total, row) => (row.reduce((subtotal, cell) => (cell + subtotal), 0) + total), 0);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleBotPlay = this.handleBotPlay.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    const lights = this.constructor.populateGrid();
    const activeCells = lights.reduce((total, row) => (row.reduce((subtotal, cell) => (cell + subtotal), 0) + total), 0);
    this.setState({ lights, activeCells, moveCount: 0, unsolvable: false });
  }

  handleToggle(e, fromBot = false) {

    e.preventDefault();
    if(this.state.activeCells === 0) {
      return;
    }
    const row = parseInt(e.target.dataset.row, 10);
    const col = parseInt(e.target.dataset.col, 10);
    this.setState(prevState => {
      const dupLights = prevState.lights.map(r => r.slice())
      let activeChange = 0
      dupLights[row][col] = dupLights[row][col] === 0 ? 1 : 0
      activeChange += dupLights[row][col] === 0 ? -1 : 1
      if(row > 0) {
        dupLights[row-1][col] = dupLights[row-1][col] === 0 ? 1 : 0
        activeChange += dupLights[row-1][col] === 0 ? -1 : 1
      }
      if (row < dupLights.length -1) {
        dupLights[row+1][col] = dupLights[row+1][col] === 0 ? 1 : 0
        activeChange += dupLights[row+1][col] === 0 ? -1 : 1
      }
      if (col > 0){
        dupLights[row][col-1] = dupLights[row][col-1] === 0 ? 1 : 0
        activeChange += dupLights[row][col-1] === 0 ? -1 : 1
      }
      if(col < dupLights[col].length -1) {
        dupLights[row][col+1] = dupLights[row][col+1] === 0 ? 1 : 0
        activeChange += dupLights[row][col+1] === 0 ? -1 : 1
      }
      return { lights: dupLights, moveCount: prevState.moveCount + 1, activeCells: prevState.activeCells + activeChange }
    });
  }

  async chaseLightsPass() {
    for (let i = 0; i < this.state.lights.length -1; i++) {
      for (let j = 0; j < this.state.lights[i].length; j++) {
        if (this.state.lights[i][j] === 1) {
          const elements = document.querySelectorAll(`[data-row='${i + 1}'][data-col='${j}']`)
          elements[0].click();
          await new Promise(r => setTimeout(r, 500));
        }
      }
    }
  }

  async handleBotPlay(e) {
    e.preventDefault();
    this.setState({ botActive: true });
    await this.chaseLightsPass();
    const finalRow = this.state.lights[this.state.lights.length -1].join("")
    const clickLocations = ROW_MAP[finalRow]
    if (typeof clickLocations === "undefined") {
      this.setState({ unsolvable: !(finalRow === "00000"), botActive: false })
      return;
    }
    for (var i = 0; i < clickLocations.length; i++) {
      const elements = document.querySelectorAll(`[data-row='0'][data-col='${clickLocations[i]}']`)
      elements[0].click();
      await new Promise(r => setTimeout(r, 500));
    }
    await this.chaseLightsPass();
    this.setState({ botActive: false })
  }

  render() {
    const grid = this.state.lights.map((row, i) => (
      <div className="row" key={i}>{row.map((cell, j) => (
        <div data-testid={`${i}-${j}`} className={`cell ${cell ? "on" : "off"} ${this.state.activeCells === 0 ? "disabled" : ""}`} data-row={i} data-col={j} key={`${i}-${j}`} onClick={this.handleToggle} />
      ))}
      </div>))

    return (
      <div className="container">
        <h2>Lights Out</h2>
        <div className="counter">Total Moves: {this.state.moveCount}</div>
        <div className="grid-container">{grid}</div>
        <div className="instructions">Instructions: Click cells to try to turn off all lights</div>
        <div className="button-container">
          <button data-testid="reset" disabled={this.state.botActive} onClick={this.handleReset}>Reset</button>
          <button data-testid="bot" disabled={this.state.botActive} onClick={this.handleBotPlay}>Auto-Play</button>
        </div>
        {this.state.activeCells === 0 &&
          <div className="message">Congratulations, you won in {this.state.moveCount} turns.  Click reset to play again!</div>
        }
        {this.state.unsolvable &&
          <div className="message">This configuration is unsolvable. Try another one with reset</div>
        }
      </div>
    );
  }
}
