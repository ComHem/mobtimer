import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TimeControl from '../TimeControl/TimeControl.jsx';
import UserList from '../UserList/UserList.jsx';
import Intermezzo from '../Intermezzo/Intermezzo.jsx';
import Notification from '../Notification/Notification.jsx';
import SimpleTimeView from '../SimpleTimeView/SimpleTimeView.jsx';
import SettingsView from '../SettingsView/SettingsView';
import { nextUser } from '../../redux/user/user_actions';
import Icon from '../Icon/Icon';

class App extends Component {
  constructor() {
      super();
      this.state = { showSettings: false };
      this.onTime = this.onTime.bind(this);
      this.onNextUser = this.onNextUser.bind(this);
      this.onToggleSettings = this.onToggleSettings.bind(this);
  }
  onTime() {
      this.props.dispatch(nextUser());
  }
  onNextUser() {
      this.props.dispatch(nextUser());
  }
  onToggleSettings() {
      this.setState({ showSettings: !this.state.showSettings });
  }
  render() {
        const { rotation, breaking } = this.props;
        const { showSettings } = this.state;
        const paneOpen = showSettings;
        return (
            <div className={`App ${paneOpen ? 'App--pane-open' : ''}`}>
                <SimpleTimeView>
                    <Notification />
                    <TimeControl onTime={this.onTime} />
                    { breaking && <Intermezzo /> }
                    <div><h4>Current rotation: {rotation} </h4></div>
                    <Icon icon='forward' onClick={this.onNextUser} />
                    <UserList />
                </SimpleTimeView>
                <button onClick={this.onToggleSettings} className={`App-settings-button App-settings-button--${showSettings ? 'open' : 'closed'}`}>Inställningar</button>
                <SettingsView className={showSettings ? 'App-settings App-settings--open' : 'App-settings'} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    rotation: state.user.rotation,
    breaking: state.time.breaking,
});
export default connect(mapStateToProps)(App);
