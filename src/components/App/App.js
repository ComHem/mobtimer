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

class App extends Component {
  constructor() {
      super();
      this.onTime = this.onTime.bind(this);
      this.onNextUser = this.onNextUser.bind(this);
  }
  onTime() {
      this.props.dispatch(nextUser());
  }
  onNextUser() {
      this.props.dispatch(nextUser());
  }
  render() {
        const { rotation, breaking } = this.props;
        return (
          <div className="App">
              <SimpleTimeView>
                  <Notification />
                  <TimeControl onTime={this.onTime} />
                  { breaking && <Intermezzo /> }
                  <SettingsView />
                  <div><h4>Current rotation: {rotation} </h4></div>
                  <button onClick={this.onNextUser}>Nästa</button>
                  <UserList />
              </SimpleTimeView>
          </div>
        );
        }
}

const mapStateToProps = (state) => ({
    rotation: state.user.rotation,
    breaking: state.time.breaking,
});
export default connect(mapStateToProps)(App);
