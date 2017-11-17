import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import UserList from '../UserList/UserList.jsx';
import Intermezzo from '../Intermezzo/Intermezzo.jsx';
import Notification from '../Notification/Notification.jsx';
import CountDownWrapper from '../CountdownWrapper/CountDownWrapper.jsx';
import SettingsView from '../SettingsView/SettingsView';
import {nextUser} from '../../redux/user/user_actions';
import Icon from '../Icon/Icon';

class App extends Component {
    constructor() {
        super();
        this.state = {showSettings: true};
        this.onTime = this.onTime.bind(this);
        this.onNextUser = this.onNextUser.bind(this);
        this.onToggleSettings = this.onToggleSettings.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current !== nextProps.current) {
            this.setState({showSettings: false});
        }
    }

    onTime() {
        this.props.dispatch(nextUser());
    }

    onNextUser() {
        this.props.dispatch(nextUser());
    }

    onToggleSettings() {
        this.setState({showSettings: !this.state.showSettings});
    }

    render() {
        const {rotation, breaking} = this.props;
        const {showSettings} = this.state;

        return (
            <div className={`App ${showSettings ? 'App--pane-open' : ''}`}>
                <div className="App-mainView">
                    <UserList/>
                    <CountDownWrapper/>
                    <Notification/>
                    {breaking && <Intermezzo/>}
                    <div><h4>Current rotation: {rotation} </h4></div>
                </div>
                <Icon icon='forward' size="large" onClick={this.onNextUser}/>
                <Icon icon='settings' onClick={this.onToggleSettings}
                      className={`App-settings-button App-settings-button--${showSettings ? 'open' : 'closed'}`}/>
                <SettingsView className={showSettings ? 'App-settings App-settings--open' : 'App-settings'}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    rotation: state.user.rotation,
    breaking: state.time.breaking,
    current: state.user.current,
});
export default connect(mapStateToProps)(App);
