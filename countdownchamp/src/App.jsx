import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: 'September 22, 2018'
      }
  }

  changeDeadline() {
    this.setState({deadline: 'September 22, 2018'})
  }

  render() {
    return  (
    <div className="App">
      <div className="App-title">
        Countdown to {this.state.deadline}
        </div>
      <div>
        <div className="Clock-days">14 days</div>
        <div className="Clock-hours">30 hours</div>
        <div className="Clock-minutes">15 minutes</div>
        <div className="Clock-seconds">20 seconds</div>
      </div>
      <div>
        <input placeholder='new date' />
        <button onClick={() => this.changeDeadline()}>
          Submit
        </button>
      </div>
    </div>
    )
  }
}

export default App;
