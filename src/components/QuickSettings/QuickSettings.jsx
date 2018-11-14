import React from 'react';
import {connect} from 'react-redux';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {faEye, faVolumeOff, faVolumeUp} from '@fortawesome/fontawesome-free-solid';
import {toggleMute} from '../../redux/sound/sound_actions';
import {Howler} from 'howler';
import './QuickSettings.scss';

class QuickSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dev: true,
        }
    }

    toggleMute = () => {
        this.props.dispatch(toggleMute());
    };

    toggleDev = () => {
        this.setState({
            dev: !this.state.dev,
        });
    };

    componentDidMount() {
        Howler.mute(this.props.muted);
    }

    render() {
        const icon = this.props.muted === true ? faVolumeOff : faVolumeUp;
        return (
            <React.Fragment>
                <div className="quick_settings__container">
                    <div className="quick_settings__item" onClick={this.toggleMute}>
                        <FontAwesomeIcon icon={icon} size="1x"/>
                    </div>

                    <div className="quick_settings__item" onClick={this.toggleDev}>
                        <FontAwesomeIcon icon={faEye} size="1x"/>
                    </div>
                </div>
            {this.state.dev && <pre className="json-formatted">{JSON.stringify(this.props.app_state, null, 2)}</pre>}
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    app_state: state,
    muted: state.sound.muted,
});

export default connect(mapStateToProps)(QuickSettings);
