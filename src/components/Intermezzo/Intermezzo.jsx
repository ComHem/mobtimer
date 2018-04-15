import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Howler} from 'howler';
import './Intermezzo.css';
import breaktime from './../../images/breaktime.png';
import AudioTest from '../../audio/AudioTest';

import {setBreaking} from '../../redux/user/user_actions';

class Intermezzo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: "",
            hour: 0,
            minute: 0,
            second: 0,
        }
    }

    randomGfycatVideo = () => {
        const videos = [
            'CheapCookedDungbeetle',
            'HandmadeInsignificantHind',
            'ShadowyCraftyEmperorshrimp',
            'ExemplaryFrailIaerismetalmark',
            'LavishUncommonAcornbarnacle',
            'HelplessQuarrelsomeAardwolf',
            'ClutteredInsistentHairstreakbutterfly',
            'YoungFatherlyCuscus',
            'BoringDangerousIndianjackal',
            'HeartfeltInsecureBronco',
            'BrightJadedBalloonfish',
            'UnitedHarshArgentinehornedfrog',
            'ImpressiveBoilingFreshwatereel',
            'GoldenGleamingArthropods',
            'FrailEasyLcont',
            'DecisiveImprobableHerculesbeetle',
            'KindAdmiredDassie',
            'TatteredMiserlyFrog',
            'ShrillSingleCod',
            'realknobbyalbertosaurus',
            'daringdentaldove',
            'biodegradabletartlamb',
            'givingpreciousabyssiniancat',
            'bonybountifulblackfootedferret',
            'FineEarlyLadybug',
        ];
        this.setState({
            background: `https://gfycat.com/ifr/${_.sample(videos)}`
        });
    };

    componentDidMount() {
        this.audio = new AudioTest();
        window.clearTimeout(window.timeoutInstance);
        Howler.unload();
        this.audio.playTurnEndedSound();
        this.randomGfycatVideo();
        this.startTimer();
    }


    onRemove() {
        this.audio = null;
        window.clearTimeout(window.timeoutInstance);
        console.info("componentWillUnmount", this);
    }

    componentWillUnmount() {
        this.onRemove();
    }

    formatTime() {
        const addZero = (val) => val > 9 ? val : `0${val}`;
        return `${addZero(this.state.hour)}:${addZero(this.state.minute)}:${addZero(this.state.second)}`;
    }

    startTimer() {
        let totalSeconds = 0;
        window.timeoutInstance = setInterval(() => {
            ++totalSeconds;
            let hour = Math.floor(totalSeconds / 3600);
            let minute = Math.floor((totalSeconds - hour * 3600) / 60);
            let second = totalSeconds - (hour * 3600 + minute * 60);

            this.setState({
                hour,
                minute,
                second
            });
        }, 1000);
    }

    exitIntermezzo = () => {
        this.props.dispatch(setBreaking(false));
    };

    render() {
        return (
            <div className="intermezzo">
                <div className="video-background">
                    <div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                        <iframe src={this.state.background}
                                frameBorder={0}
                                scrolling='no'
                                width='100%'
                                height='100%'/>
                    </div>
                </div>
                <div className="intermezzo__content">
                    <div className="intermezzo__content__header">
                        <img src={breaktime} alt="break time"/>
                    </div>

                    <div className="intermezzo__content__buttons">
                        <div title="Fortsätt" className="intermezzo__content__buttons--play pointer" onClick={this.exitIntermezzo}/>
                    </div>

                    <div className="intermezzo__content__elapsed-time">
                        {this.formatTime()}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    breaking: state.user.breaking,
});
export default connect(mapStateToProps)(Intermezzo);
