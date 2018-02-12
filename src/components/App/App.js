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
import logo from '../../images/com_hem_logo.png';

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
        this.props.dispatch(nextUser(this.props.settings.breakInterval));
    }

    onNextUser() {
        this.props.dispatch(nextUser(this.props.settings.breakInterval));
    }

    onToggleSettings() {
        this.setState({showSettings: !this.state.showSettings});
    }

    renderView() {
        if (this.props.breaking) {
            return (<Intermezzo/>);
        } else {
            return (
                <div>
                    <UserList/>
                    <CountDownWrapper/>
                    <Notification/>
                </div>
            )
        }
    }

    render() {
        const {rotation, breakInterval} = this.props;
        const {showSettings} = this.state;

        return (
            <div className={`App ${showSettings ? 'App--pane-open' : ''}`}>
                <div className="App-mainView">
                    <div className="background"/>
                    {this.renderView()}
                </div>

                <Icon icon='settings'
                      onClick={this.onToggleSettings}
                      className={`App-settings-button App-settings-button--${showSettings ? 'open' : 'closed'}`}
                />

                <div className="rotation">
                    <h2>Current rotation: {rotation}</h2>
                    <h3>{`Break every ${breakInterval} rotations`}</h3>
                </div>

                <SettingsView
                    className={showSettings ? 'App-settings App-settings--open' : 'App-settings'}
                />

                <footer>
                    <img src={logo} alt=""/>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    breakInterval: state.settings.breakInterval,
    rotation: state.user.rotation,
    breaking: state.user.breaking,
    current: state.user.current,
});
export default connect(mapStateToProps)(App);
