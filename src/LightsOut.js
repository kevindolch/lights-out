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
      moveCount: 0
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({ lights: this.constructor.populateGrid(), moveCount: 0 });
  }

  handleToggle(e) {
    e.preventDefault();
    const row = parseInt(e.target.dataset.row, 10);
    const col = parseInt(e.target.dataset.col, 10);
    this.setState(prevState => {
      const dupLights = prevState.lights.map(r => r.slice())
      dupLights[row][col] = dupLights[row][col] === 0 ? 1 : 0
      if(row > 0) {
        dupLights[row-1][col] = dupLights[row-1][col] === 0 ? 1 : 0
      }
      if (row < dupLights.length -1) {
        dupLights[row+1][col] = dupLights[row+1][col] === 0 ? 1 : 0
      }
      if (col > 0){
        dupLights[row][col-1] = dupLights[row][col-1] === 0 ? 1 : 0
      }
      if(col < dupLights[col].length -1) {
        dupLights[row][col+1] = dupLights[row][col+1] === 0 ? 1 : 0
      }
      return { lights: dupLights, moveCount: prevState.moveCount + 1 }
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
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}
