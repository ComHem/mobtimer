import React, {Component} from 'react';
import {connect} from 'react-redux';
import VideoPlayer from 'react-youtube-player';
import {setBreaking} from '../../redux/user/user_actions';
import CountDownWrapper from "../CountdownWrapper/CountDownWrapper";
import './Intermezzo.css';

class Intermezzo extends Component {
    closeIntermezzo = () => {
        this.props.dispatch(setBreaking(false));
    };

    render() {
        const {sessionLength} = this.props;
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
                    <CountDownWrapper />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    breaking: state.settings.breaking,
});
export default connect(mapStateToProps)(Intermezzo);
