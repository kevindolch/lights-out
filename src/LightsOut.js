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
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}
