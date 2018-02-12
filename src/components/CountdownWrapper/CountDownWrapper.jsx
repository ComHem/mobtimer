import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
import {nextUser, setBreaking} from '../../redux/user/user_actions';
import elevator from "../../audio/tracks/elevator_jazz.mp3";
import {randomSound, randomAlarmTrack} from "../../audio/Audio";
import './CountDownWrapper.css';

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

    componentDidMount() {
        this.changeFavicon();
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
            setTimeout(this.playAlarm, 10000);
        });

        this.props.dispatch(nextUser(this.props.settings.breakInterval));
    };

    pauseTimer = () => {
        this.state.pause ? this.elevator.pause() : this.elevator.play();
        this.setState({
            pause: !this.state.pause
        }, this.changeFavicon());
    };

    changeFavicon = () => {
        const favicon = "/favicon.ico";
        const faviconPaused = "/favicon--paused.png";

        let link = document.createElement('link'),
            oldLink = document.getElementById('dynamic-favicon');
        link.id = 'dynamic-favicon';
        link.rel = 'icon';
        link.href = this.state.pause ? favicon : faviconPaused;

        if (oldLink) {
            document.head.removeChild(oldLink);
        }
        document.head.appendChild(link);
    };

    nextUser = () => {
        if (this.props.breaking) {
            this.props.dispatch(setBreaking(false));
            return;
        }

        this.props.dispatch(nextUser(this.props.settings.breakInterval));
        this.setState({
            pause: true
        });
        this.resetTimer();
    };

    getTimerStateClass() {
        return this.state.pause ? '--paused' : '--playing';
    }

    render() {
        const sessionLength = +this.props.sessionLength * 60;
        const color = this.state.pause ? "#FF6B6B" : "#C7F464";
        const size = 450;

        return (
            <div className="countdown-wrapper">
                {this.state.completed || this.state.pause && <div className="countdown-wrapper__play-btn"/>}

                {this.state.show &&
                <div className="countdown-wrapper__clock-wrapper" style={{width: `${size}px`, height: `${size}px`}}>
                    <div className="countdown-wrapper__clock"
                         onClick={this.state.completed ? this.resetTimer : this.pauseTimer}
                         >
                        <ReactCountdownClock
                            seconds={sessionLength}
                            weight={70}
                            showMilliseconds={false}
                            color={color}
                            alpha={1}
                            size={size}
                            onComplete={this.onComplete}
                            paused={this.state.pause}
                            pausedText=""
                        />
                    </div>
                    <div className={`blur ${this.getTimerStateClass()}`}/>
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
