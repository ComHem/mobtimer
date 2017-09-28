import React from 'react';
import {connect} from 'react-redux';
import { setBreaking } from '../../redux/time/time_actions';
import './Intermezzo.css';

const Intermezzo = ({secondsLeft, dispatch}) => (
    <div className="intermezzo">Breaking... For another {secondsLeft} seconds. 😴
        <button onClick={()=> dispatch(setBreaking(false))}>Nästa</button>
    </div>
);

const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
});
export default connect(mapStateToProps)(Intermezzo);
