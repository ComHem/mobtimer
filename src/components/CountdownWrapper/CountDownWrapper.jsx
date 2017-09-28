import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';

class CountDownWrapper extends Component {

    state = {
        show: true
    };

    resetTimer = () => {
        console.log("reset");
        this.setState({show: false}, () => {this.setState({show: true})});

    };

    renderClock = (
        <div className="App__clock-wrapper">
            <ReactCountdownClock seconds={600}
                                 weight={20}
                                 color="#FFC6D0"
                                 alpha={0.9}
                                 size={300}

            />
        </div>
    );

    render() {
        return (
            <div>
                {this.state.show && this.renderClock}
                <button onClick={this.resetTimer}>RESET TIMER</button>
            </div>
        );
    }
}

export default CountDownWrapper;
