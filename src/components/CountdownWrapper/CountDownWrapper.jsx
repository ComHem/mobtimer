import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
import {nextUser} from '../../redux/user/user_actions';

class CountDownWrapper extends Component {

    state = {
        show: true
    };

    resetTimer = () => {
        console.log("reset");
        this.setState({show: false}, () => {this.setState({show: true})});
    };

    onComplete = () => {
        console.log("NEXT");
        this.props.dispatch(nextUser());
    };

    renderClock = (
        <div className="App__clock-wrapper">
            <ReactCountdownClock seconds={5}
                                 weight={20}
                                 color="#FFC6D0"
                                 alpha={0.9}
                                 size={300}
                                 onComplete={this.onComplete}
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

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    running: state.time.running
});

export default connect(mapStateToProps)(CountDownWrapper);