import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import { connect } from 'react-redux';
import { nextUser } from '../../redux/user/user_actions';
import './CountDownWrapper.css';
import alarm from  "../../audio/alarm.ogg";


class CountDownWrapper extends Component {
    constructor(props){
        super(props);
        this.alarm = new Audio(alarm);
    }
    state = {
        show: true,
        completed: false,
        pause: false
    };

    resetTimer = () => {
        console.log("reset");
        this.setState({ show: false }, () => {
            this.setState({
                show: true,
                completed: false
            })
        });
    };

    onComplete = () => {
        this.alarm.play();
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


    render() {
        const { sessionLength } = this.props;
        const size = 400;
        return (
            <div className="countdown-wrapper">
                {this.state.completed && <div className="countdown-wrapper__play-btn" />}
                {this.state.pause && <div className="countdown-wrapper__pause-btn" />}
                {this.state.show &&
                    <div className="countdown-wrapper__clock-wrapper" style={{    width: `${size}px`, height: `${size}px`}}
                    onClick={this.state.completed ? this.resetTimer : this.pauseTimer}>
                        <ReactCountdownClock
                            seconds={5}
                            weight={50}
                            color="#0f0"
                            alpha={0.9}
                            size={size}
                            onComplete={this.onComplete}
                            paused={this.state.pause}
                            pausedText=""
                        />
                    </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    running: state.time.running
});

export default connect(mapStateToProps)(CountDownWrapper);
