import React from 'react';
import {connect} from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faPlay, faVolumeOff, faVolumeUp} from '@fortawesome/fontawesome-free-solid';
import {toggleMute} from '../../redux/sound/sound_actions';
import './QuickSettings.scss';

class QuickSettings extends React.Component {
    toggleMute = () => {
        this.props.dispatch(toggleMute());
    };

    componentDidMount() {
        this.toggleMute();
    }

    render() {
        const icon = this.props.muted === true ? faVolumeOff : faVolumeUp;
        return (
            <div className="quick_settings__container" onClick={this.toggleMute}>
                <div className="quick_settings__item">
                    <FontAwesomeIcon icon={icon} size="1x"/>
                </div>
            </div>
        );
    };

}

const mapStateToProps = (state) => ({
    muted: state.sound.muted,
});

export default connect(mapStateToProps)(QuickSettings);
