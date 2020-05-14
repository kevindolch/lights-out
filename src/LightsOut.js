import React from 'react';
import './App.css';

export default class LightsOut extends React.Component {
  static populateGrid() {
    return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => Math.round(Math.random())));
  }

  constructor(props) {
    super(props);
    this.state = {
      lights: this.constructor.populateGrid(),
      moveCount: 0,
      activeCells: 0
    }
    this.state.activeCells = this.state.lights.reduce((total, row) => (row.reduce((subtotal, cell) => (cell + subtotal), 0) + total), 0);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    const lights = this.constructor.populateGrid();
    const activeCells = lights.reduce((total, row) => (row.reduce((subtotal, cell) => (cell + subtotal), 0) + total), 0);
    this.setState({ lights, activeCells, moveCount: 0 });
  }

  handleToggle(e) {
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

  render() {
    const grid = this.state.lights.map((row, i) => (
      <div className="row" key={i}>{row.map((cell, j) => (
        <div className={`cell ${cell ? "on" : "off"}`} data-row={i} data-col={j} key={`${i}-${j}`} onClick={this.handleToggle} />
      ))}
      </div>))

    return (
      <div>
        <div className="counter">{this.state.moveCount}</div>
        {grid}
        {this.state.activeCells === 0 &&
          <div>Congratulations, you won in {this.state.moveCount} turns.  Click reset to play again!</div>
        }
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
