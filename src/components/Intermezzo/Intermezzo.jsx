import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import CountDownWrapper from "../CountdownWrapper/CountDownWrapper";
import './Intermezzo.css';

class Intermezzo extends Component {
    randomGfycatVideo = () => {
        const videos = [
            'CheapCookedDungbeetle',
            'HandmadeInsignificantHind',
            'ShadowyCraftyEmperorshrimp',
            'ExemplaryFrailIaerismetalmark',
            'LavishUncommonAcornbarnacle',
        ];
        return _.sample(videos);
    };

    render() {
        return (
            <div className="intermezzo">
                <div className="video-background">
                    <div style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
                        <iframe src={`https://gfycat.com/ifr/${this.randomGfycatVideo()}`}
                                frameBorder={0}
                                scrolling='no'
                                width='100%'
                                height='100%'/>
                    </div>
                </div>
                <div className="intermezzo__content">
                    <CountDownWrapper/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    breaking: state.settings.breaking,
});
export default connect(mapStateToProps)(Intermezzo);
