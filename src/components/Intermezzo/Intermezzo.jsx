import React from 'react';
import {connect} from 'react-redux';
import './Intermezzo.css';

const Intermezzo = ({secondsLeft}) => (<div className="intermezzo">Breaking... For another {secondsLeft} seconds. 😴</div>);

const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
});
export default connect(mapStateToProps)(Intermezzo);
