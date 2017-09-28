import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TimeControl from '../TimeControl/TimeControl.jsx';
import UserList from '../UserList/UserList.jsx';
import Intermezzo from '../Intermezzo/Intermezzo.jsx';
import Notification from '../Notification/Notification.jsx';
import SimpleTimeView from '../SimpleTimeView/SimpleTimeView.jsx';
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
                  <div><h4>Current rotation: {rotation} </h4></div>
                  <button onClick={this.onNextUser}>Nästa</button>
                  <UserList />
                  <div>
                      <h3>Feature list</h3>
                      <ul>
                          <li className="app__done">Lägg till / ta bort användare</li>
                          <li className="app__done">Rotation av användare</li>
                          <li className="app__done">Starta/stoppa tiden</li>
                          <li className="app__done">Nollställtiden</li>
                          <li className="app__done">Nästa mobbare</li>
                          <li className="app__done">Pauser</li>
                          <li className="app__done">Variabel pauslängd</li>
                          <li className="app__done">Notifiera om skifte</li>
                          <li className="app__done">Local storage</li>
                          <li>Dockerize</li>
                          <li>Fix node config(including server mode)</li>
                      </ul>
                      <h3>Bonus</h3>
                      <ul>
                          <li>Keyboard shortcuts</li>
                          <li>Timglas-look</li>
                          <li>Coming up</li>
                          <li>Avatarer</li>
                          <li>Vad gör vi / trello-integration? </li>
                          <li>Slack integration(visa team mess)</li>
                          <li>Sortera Användare</li>
                          <li>Slump ordning</li>
                          <li>Autostart av nästa</li>
                          <li>Uträknad sessionslängd(ex 60 min / deltagare - paus)</li>
                      </ul>
                  </div>
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
