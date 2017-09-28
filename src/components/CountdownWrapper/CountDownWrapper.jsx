import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
import {nextUser} from '../../redux/user/user_actions';
import './CountDownWrapper.css';


class CountDownWrapper extends Component {

    state = {
        show: true,
        completed: false,
        pause: false
    };

    resetTimer = () => {
        console.log("reset");
        this.setState({show: false}, () => {this.setState({
            show: true,
            completed: false
        })});
    };

    onComplete = () => {
        console.log("NEXT");
        this.setState({
            completed: true
        });
        this.props.dispatch(nextUser());
    };

    pauseTimer = () => {
        console.log("pause")
        this.setState({
            pause: !this.state.pause
        })
    }

    renderClock = (
        <div className="App__clock-wrapper pointer" onClick={this.resetTimer}>
            <ReactCountdownClock
                seconds={5}
                weight={20}
                color="#0f0"
                alpha={0.9}
                size={300}
                onComplete={this.onComplete}
                paused={this.state.pause}

            />
        </div>
    );

    render() {
        return (
            <div className="countdown-wrapper">
                { this.state.completed && <div className="countdown-wrapper__play-btn" /> }
                { this.state.pause && <div className="countdown-wrapper__pause-btn" /> }
                { this.state.show && this.renderClock}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    running: state.time.running
});

export default connect(mapStateToProps)(CountDownWrapper);