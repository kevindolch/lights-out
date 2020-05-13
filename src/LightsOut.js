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
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({ lights: this.constructor.populateGrid(), moveCount: 0 });
  }

  render() {
    const grid = this.state.lights.map((row, i) => (
      <div className="row" key={i}>{row.map((cell, j) => (
        <div className={`cell ${cell ? "on" : "off"}`} data-row={i} data-col={j} key={`${i}-${j}`} />
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
