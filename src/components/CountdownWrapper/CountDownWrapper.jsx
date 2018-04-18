import React, {Component} from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import {connect} from 'react-redux';
import AudioTest from './../../audio/AudioTest';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/fontawesome-free-solid';

import {nextUser} from '../../redux/user/user_actions';
import './CountDownWrapper.css';

class CountDownWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            completed: false,
            pause: false
        };

        this.colors = {
            breaking: {
                color: '#F8D664',
                className: '--breaking'
            },
            playing: {
                color: '#C7F464',
                className: '--playing'
            },
            paused: {
                color: '#FF6B6B',
                className: '--paused'
            },
        }
    }

    componentDidMount() {
        this.audio = new AudioTest();
        this.changeFavicon();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sessionLength !== this.props.sessionLength || (nextProps.current !== this.props.current && this.props.completed)) {
            this.resetTimer();
        }
    }

    resetTimer = () => {
        this.audio.stopAudio();
        this.setState({show: false}, () => {
            this.setState({
                show: true,
                completed: false,
            })
        });
    };

    playAlarm = () => {
        if (this.state.completed === true && this.props.breaking === false) {
            this.audio.playAlarmSound();
            console.error("PLAYING ALARM AFTER TIMEOUT");
        } else {
            this.audio.stopAudio();
        }
    };

    onComplete = () => {
        this.audio.playTurnEndedSound();

        this.setState({
            completed: true
        }, () => {
            if (this.props.breaking === false) {
                window.clearTimeout(window.timeoutInstance);
                window.timeoutInstance = setTimeout(this.playAlarm, 10000, !!this.props.breaking);
            }
        });

        this.props.dispatch(nextUser(this.props.breakInterval));
    };

    pauseTimer = () => {
        this.audio.stopAudio();
        if (!this.state.pause) {
            this.audio.playPauseMusic();
        }

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
        this.props.dispatch(nextUser(this.props.breakInterval));
        this.setState({
            pause: true
        });
        this.resetTimer();
    };

    getColorState() {
        if (this.props.breaking) {
            return this.colors.breaking;
        } else if (this.state.pause) {
            return this.colors.paused;
        } else {
            return this.colors.playing;
        }
    }

    renderPlayButton() {
        if (this.state.completed || this.state.pause) {
            return (
                <div className="countdown-wrapper__play-btn">
                    <FontAwesomeIcon icon={faPlay} size="3x"/>
                </div>
            );
        }
    }

    render() {
        const sessionLength = +this.props.sessionLength * 60;
        const size = 360;

        return (
            <div className="countdown-wrapper">
                {this.renderPlayButton()}
                {this.state.show &&
                <div className="countdown-wrapper__clock-wrapper" style={{width: `${size}px`, height: `${size}px`}}>
                    <div className="countdown-wrapper__clock"
                         onClick={this.state.completed ? this.resetTimer : this.pauseTimer}>
                        <ReactCountdownClock
                            seconds={sessionLength}
                            weight={45}
                            showMilliseconds={false}
                            color={this.getColorState().color}
                            alpha={1}
                            size={size}
                            onComplete={this.onComplete}
                            paused={this.state.pause}
                            pausedText=""
                        />
                    </div>
                    <div className={`blur ${this.getColorState().className}`}/>
                </div>}
                <div className="countdown-wrapper__next-btn" onClick={this.nextUser}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    current: state.user.current,
    breaking: state.user.breaking,
    breakInterval: state.settings.breakInterval,
    sessionLength: state.settings.sessionLength,
});

export default connect(mapStateToProps)(CountDownWrapper);
