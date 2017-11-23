import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoPlayer from 'react-youtube-player';
import {setBreaking} from '../../redux/time/time_actions';
import './Intermezzo.css';

class Intermezzo extends Component {
    constructor() {
        super();
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
                    <p>{secondsLeft} sekunder kvar</p>
                    <button onClick={() => dispatch(setBreaking(false))}>Fortsätt</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
    breaking: state.time.breaking,
});
export default connect(mapStateToProps)(Intermezzo);
