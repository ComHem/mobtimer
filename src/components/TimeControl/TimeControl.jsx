import React from 'react';
import { connect } from 'react-redux';
import Icon from '../Icon/Icon';
import { setSecondsLeft, decrementSeconds, setRunning } from '../../redux/time/time_actions';
import { nextUser } from '../../redux/user/user_actions';

class TimeControl extends React.Component {
    constructor({sessionLength}){
        super();
        this.onTimer = this.onTimer.bind(this);
        this.onStopTimer = this.onStopTimer.bind(this);
        this.onStartTimer = this.onStartTimer.bind(this);
        this.onPauseTimer = this.onPauseTimer.bind(this);
        this.onNextUser = this.onNextUser.bind(this);
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
        if (this.props.onTime) {
            this.props.onTime();
        }
    }
    onNextUser() {
        this.props.dispatch(nextUser());
    }
    componentWillReceiveProps(nextProps){
        if (this.props.currentUser !== nextProps.currentUser) {
            this.onStopTimer();
        }
        if (this.props.rotation !== nextProps.rotation && !(nextProps.rotation % this.props.breakInterval)) {
            //this.props.dispatch(setSecondsLeft(this.props.breakTime));
        } else if (this.props.secondsLeft !== nextProps.secondsLeft && nextProps.secondsLeft === 0) {
            this.onTimeEnd();
        }
    }
    render() {
        const { running } = this.props;
        return (<div>
            {running
                ? (<Icon icon='pause' size="large" onClick={this.onPauseTimer} />)
                : (<Icon icon='play' size="large" onClick={this.onStartTimer} />)}
            <Icon icon='stop' size="large" onClick={this.onStopTimer} />
            <Icon icon='forward' size="large" onClick={this.onNextUser} />
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
