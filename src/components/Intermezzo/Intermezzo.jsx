import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoPlayer from 'react-youtube-player';
import {setBreaking} from '../../redux/user/user_actions';
import './Intermezzo.css';

class Intermezzo extends Component {
    componentDidMount() {
        this.setState({
            secondsLeft: this.props.secondsLeft
        }, () => {
            setTimeout(() => {
                this.props.dispatch(setBreaking(false))
            }, +this.props.secondsLeft * 1000);
        });
    }

    render() {
        const {secondsLeft, dispatch} = this.props;
        return (
            <div className="intermezzo">
                <div className="video-background">
                    <VideoPlayer
                        videoId="fRscYVvEFt8"
                        playbackState='playing'
                        configuration={{
                            autoplay: 1,
                            loop: 1,
                            showinfo: 0,
                            disablekb: 1,
                            fs: 0,
                            rel: 0,
                            modestbranding: 1,
                            controls: 0,
                            volume: 0,
                        }}/>
                </div>
                <div className="intermezzo__content">
                    <p>{secondsLeft} seconds left of break</p>

                    <button onClick={() => dispatch(setBreaking(false))}>
                        Continue
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
    breakTime: state.settings.breakTime,
});
export default connect(mapStateToProps)(Intermezzo);
