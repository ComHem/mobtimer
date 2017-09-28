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
        const { className='', fields } = this.props;
        return (
            <div className={`SettingsView ${className}`}>
                {Object.keys(fields).map((fieldName) => (
                    <div key={fieldName}>
                        <h3>{fieldName}</h3>
                        <input
                            value={fields[fieldName]}
                            onChange={(event) => this.onChange(fieldName, event.target.value)}
                        />
                    </div>
                ))}
            </div>
        )
    };

}

const mapStateToProps = (state) => ({
    fields: {
        ...state.settings,
    },
});

export default connect(mapStateToProps)(SettingsView);
