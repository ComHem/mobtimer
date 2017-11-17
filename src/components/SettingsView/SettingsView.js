import React from 'react';
import {connect} from 'react-redux';
import {updateSettings} from '../../redux/settings/settings_action';
import './SettingsView.css';
import {addUser} from '../../redux/user/user_actions';

class SettingsView extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(name, value) {
        if (value.match(/^[0-9]+$/)) {
            this.props.dispatch(updateSettings({[name]: value}));
        }
    }

    onAddUser(name) {
        this.props.dispatch(addUser({name, sleeping: false}));
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.current !== nextProps.current){
            this.setState({hidden: false})
        }
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        this.onAddUser(this.name.value);
    };

    renderFields() {
        const {fields} = this.props;

        return Object.keys(fields).filter(fieldName => fieldName !== 'strings').map((fieldName) => (
            <div key={fieldName}>
                <h3>{fields.strings[fieldName]}</h3>
                <input
                    value={fields[fieldName]}
                    onChange={(event) => this.onChange(fieldName, event.target.value)}
                />
            </div>
        ))
    }

    render() {
        const {className = ''} = this.props;
        return (
            <div className={`SettingsView ${className}`}>
                {this.renderFields()}

                <form onSubmit={this.onFormSubmit}>
                    <h3>Lägg till person</h3>
                    <input id="name" ref={(ref) => this.name = ref}/>
                    <button>Lägg till</button>
                </form>
            </div>
        )
    };

}

const mapStateToProps = (state) => ({
    current: state.user.current,
    fields: {
        ...state.settings,
    },
});

export default connect(mapStateToProps)(SettingsView);
