import React, { Component } from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import { connect } from 'react-redux';
import { nextUser } from '../../redux/user/user_actions';
import './CountDownWrapper.css';
import alarm from  "../../audio/alarm.ogg";
import notification from  "../../audio/belt-snap01.ogg";
import {randomSound} from "../../audio/Audio";


class CountDownWrapper extends Component {
    constructor(props){
        super(props);
        this.alarm = new Audio(alarm);
        this.alarm.loop = true;
    }

    state = {
        show: true,
        completed: false,
        pause: false
    };

    componentWillReceiveProps(nextProps){
        if (nextProps.sessionLength !== this.props.sessionLength || (nextProps.current !== this.props.current && this.props.completed)) {
            this.resetTimer();
        }
    }

    resetTimer = () => {
        this.pauseAlarm();
        this.setState({ show: false }, () => {
            this.setState({
                show: true,
                completed: false
            })
        });
    };

    pauseAlarm() {
        this.alarm.pause();
    };

    playAlarm = () => {
      if(this.state.completed) {
          this.alarm.play();
      }
    };

    onComplete = () => {
        randomSound().play();

        this.setState({
            completed: true
        }, () => {
           setTimeout( this.playAlarm, 10000 )
        });

        this.props.dispatch(nextUser());
    };

    pauseTimer = () => {
        this.setState({
            pause: !this.state.pause
        })
    };


    render() {
        const { sessionLength } = this.props;
        return (
            <div className="countdown-wrapper">
                {this.state.completed && <div className="countdown-wrapper__play-btn" />}
                {this.state.pause && <div className="countdown-wrapper__pause-btn" />}
                {this.state.show &&
                    <div className="countdown-wrapper__clock-wrapper" onClick={this.state.completed ? this.resetTimer : this.pauseTimer}>
                        <ReactCountdownClock
                            seconds={sessionLength}
                            weight={50}
                            color="#0f0"
                            alpha={0.9}
                            size={800}
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
    running: state.time.running,
    current: state.user.current
});

export default connect(mapStateToProps)(CountDownWrapper);