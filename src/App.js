import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      isError: false
    }
  }
  increment = () => {
    let { counter } = this.state
    if (counter) {
      this.setState({ counter: counter + 1 })
      return false
    }
    this.setState({ counter: counter + 1, isError: false })

  }
  decrement = () => {
    let { counter } = this.state
    if (counter) {
      this.setState({ counter: counter - 1 })
      return false
    }
    this.setState({ isError: true })
  }
  render() {
    return (
      <div data-test="component-app" className="App" >
        <h1 data-test='counter-display'>Counter: {this.state.counter}</h1>
        {
          this.state.isError ? <p data-test="decrement-error" style={{ color: 'red' }}>The counter can't go below 0</p>
            : ''
        }
        <button
          type="button"
          data-test='increment-button'
          onClick={() => this.increment()}
        >Increment Counter
        </button>
        <button
          type="button"
          data-test='decrement-button'
          onClick={() => this.decrement()}
        >Decrement Counter
        </button>

      </div>
    );
  }

}

export default App;
