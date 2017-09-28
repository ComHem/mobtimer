import React from 'react';
import { connect } from 'react-redux';
import { setSecondsLeft, decrementSeconds, setBreaking, setRunning } from '../../redux/time/time_actions';

class TimeControl extends React.Component {
    constructor({sessionLength}){
        super();
        this.onTimer = this.onTimer.bind(this);
        this.onStopTimer = this.onStopTimer.bind(this);
        this.onStartTimer = this.onStartTimer.bind(this);
        this.onPauseTimer = this.onPauseTimer.bind(this);
        this.onTimeEnd = this.onTimeEnd.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.state = {
            currentTime: sessionLength || 600,
            running: false,
        };
    }
    onStartTimer(){
        this.timer = window.setInterval(this.onTimer, 1000);
        this.props.dispatch(setRunning(true));
    }
    onStopTimer(){
        window.clearInterval(this.timer);
        this.resetTimer();
        this.props.dispatch(setRunning(false));
    }
    onPauseTimer() {
        window.clearInterval(this.timer);
        this.props.dispatch(setRunning(false));
    }
    resetTimer() {
        let lengthOfTime = this.props.sessionLength || 600;
        this.props.dispatch(setSecondsLeft(lengthOfTime));
    }
    onTimer() {
        this.props.dispatch(decrementSeconds());
    }
    onTimeEnd() {
        this.onStopTimer();
        if (this.props.breaking) {
            this.props.dispatch(setBreaking(false));
            this.resetTimer();
        }
        else if (this.props.onTime) {

            this.props.onTime();
        }
    }
    componentWillReceiveProps(nextProps){
        if ((this.props.breaking  !== nextProps.breaking) && nextProps.breaking) {
            this.onStartTimer();
        }
        if (this.props.currentUser !== nextProps.currentUser) {
            this.onStopTimer();
        }
        if (this.props.rotation !== nextProps.rotation && !(nextProps.rotation % this.props.breakInterval)) {
            this.props.dispatch(setSecondsLeft(this.props.breakTime));
            this.props.dispatch(setBreaking(true));
        } else if (this.props.secondsLeft !== nextProps.secondsLeft && nextProps.secondsLeft === 0) {
            this.onTimeEnd();
        }
    }
    render() {
        const { running } = this.props;
        return (<div>
            {running
                ? (<button onClick={this.onPauseTimer}>Paus</button>)
                : (<button onClick={this.onStartTimer}>Start</button>)}
            <button onClick={this.onStopTimer}>Stop</button>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.current,
    rotation: state.user.rotation,
    breakInterval: state.settings.breakInterval,
    breaking: state.time.breaking,
    running: state.time.running,
    secondsLeft: state.time.secondsLeft,
    sessionLength: state.settings.sessionLength,
    breakTime: state.settings.breakTime,
});

export default connect(mapStateToProps)(TimeControl);
