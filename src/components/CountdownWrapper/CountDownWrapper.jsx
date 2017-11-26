import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
import {nextUser} from '../../redux/user/user_actions';
import './CountDownWrapper.css';
import elevator from "../../audio/tracks/elevator_jazz.mp3";
import {randomSound, randomAlarmTrack} from "../../audio/Audio";


class CountDownWrapper extends Component {
    constructor(props) {
        super(props);
        this.alarm = new Audio(randomAlarmTrack());
        this.alarm.loop = true;

        this.elevator = new Audio(elevator);
        this.elevator.volume = 1;
        this.elevator.loop = true;

        this.state = {
            show: true,
            completed: false,
            pause: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sessionLength !== this.props.sessionLength || (nextProps.current !== this.props.current && this.props.completed)) {
            this.resetTimer();
        }
    }

    resetTimer = () => {
        this.pauseAlarm();
        this.setState({show: false}, () => {
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
        this.elevator.pause();
        this.alarm = randomAlarmTrack();
        this.alarm.loop = true;

        if (this.state.completed) {
            this.alarm.play();
        }
    };

    onComplete = () => {
        randomSound().play();

        this.setState({
            completed: true
        }, () => {
            setTimeout(this.playAlarm, 13000);
        });

        this.props.dispatch(nextUser(this.props.settings.breakInterval));
    };

    pauseTimer = () => {
        this.state.pause ? this.elevator.pause() : this.elevator.play();
        this.setState({
            pause: !this.state.pause
        });
    };

    nextUser = () => {
        this.props.dispatch(nextUser(this.props.settings.breakInterval));
        this.setState({
            pause: true
        });
        this.resetTimer();
    };


    render() {
        const sessionLength = +this.props.sessionLength * 60;
        const size = 450;

        return (
            <div className="countdown-wrapper">
                {this.state.completed || this.state.pause && <div className="countdown-wrapper__play-btn"/>}

                {this.state.show &&
                <div className="countdown-wrapper__clock-wrapper" style={{width: `${size}px`, height: `${size}px`}}
                     onClick={this.state.completed ? this.resetTimer : this.pauseTimer}>

                    <ReactCountdownClock
                        seconds={sessionLength}
                        weight={60}
                        showMilliseconds={false}
                        color="#C7F464"
                        alpha={1}
                        size={size}
                        onComplete={this.onComplete}
                        paused={this.state.pause}
                        pausedText="" />
                    <div className={`blur ${this.state.pause && '--paused'}`}/>
                </div>}
                <div className="countdown-wrapper__next-btn" onClick={this.nextUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    breaking: state.user.breaking,
    settings: state.settings,
    sessionLength: state.settings.sessionLength,
    running: state.time.running,
    current: state.user.current
});

export default connect(mapStateToProps)(CountDownWrapper);
