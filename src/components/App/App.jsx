import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import UserList from '../UserList/UserList.jsx';
import Intermezzo from '../Intermezzo/Intermezzo.jsx';
import CountDownWrapper from '../CountdownWrapper/CountDownWrapper.jsx';
import QuickSettings from '../QuickSettings/QuickSettings';
import SettingsView from '../SettingsView/SettingsView';
import {nextUser} from '../../redux/user/user_actions';
import Icon from '../Icon/Icon';
import logo from '../../images/com_hem_logo.png';

class App extends Component {
    constructor() {
        super();
        this.state = {
            build: "",
            showSettings: true
        };
        this.onTime = this.onTime.bind(this);
        this.onNextUser = this.onNextUser.bind(this);
        this.onToggleSettings = this.onToggleSettings.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current !== nextProps.current) {
            this.setState({showSettings: false});
        }
    }

    componentDidMount() {
        fetch("/static/build.txt").then((content) => {
            return content.text().then((text) => {
                if (text.length > 20) {
                    return;
                }
                this.setState({build: text});
            });
        });
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

    closeSettingsPane = () => {
        this.setState({showSettings: false});
    };

    renderView() {
        if (this.props.breaking) {
            return (
                <div>
                    <Intermezzo/>
                </div>
            );
        } else {
            return (
                <div>
                    <QuickSettings/>
                    <UserList/>
                    <CountDownWrapper/>
                </div>
            )
        }
    }

    render() {
        const {rotation, breakInterval, sessionLength} = this.props;
        const {showSettings} = this.state;

        return (
            <div className={`App ${showSettings ? 'App--pane-open' : ''}`}>
                <div className="App-mainView" onClick={this.closeSettingsPane}>
                    <div className="background"/>
                    {this.renderView()}
                </div>

                <Icon
                    icon='settings'
                    onClick={this.onToggleSettings}
                    className={`App-settings-button App-settings-button--${showSettings ? 'open' : 'closed'}`}
                />

                <div className="rotation">
                    <h2>Current rotation: {rotation}</h2>
                    <h3>{`Break after every ${breakInterval} rotations`}<br/>
                        <sub>{`(Every ${breakInterval * sessionLength} minutes)`}</sub>
                    </h3>
                </div>

                <SettingsView
                    className={showSettings ? 'App-settings App-settings--open' : 'App-settings'}
                />

                <footer>
                    <img title={`Build: ${this.state.build}`} src={logo} alt=""/>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    breakInterval: state.settings.breakInterval,
    sessionLength: state.settings.sessionLength,
    rotation: state.user.rotation,
    breaking: state.user.breaking,
    current: state.user.current,
});
export default connect(mapStateToProps)(App);
