import React from 'react';
import { connect } from 'react-redux';
import { updateSettings } from '../../redux/settings/settings_action';
import './SettingsView.css';

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }
    onChange(name, value) {
        if (value.match(/^[0-9]+$/)) {
            this.props.dispatch(updateSettings({ [name]: value }));
        }
    }
    render () {
        const { sessionLength, breakInterval, breakTime } = this.props;
        const fieldNames = { sessionLength, breakInterval, breakTime };
        return (
            <div className="SettingsView">
                {Object.keys(fieldNames).map((fieldName) => (
                    <div key={fieldName}>
                        <h3>{fieldName}</h3>
                        <input
                            value={fieldNames[fieldName]}
                            onChange={(event) => this.onChange(fieldName, event.target.value)}
                        />
                    </div>
                ))}
            </div>
        )
    };

}

const mapStateToProps = (state) => ({
    sessionLength: state.settings.sessionLength,
    breakInterval: state.settings.breakInterval,
    breakTime: state.settings.breakTime,
});

export default connect(mapStateToProps)(SettingsView);
