import React from 'react';
import { connect } from 'react-redux';

import './SimpleTimeView.css';

const SimpleTimeView = ({ children, secondsLeft }) => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return (
        <div className="SimpleTimeView" >
            <div className="SimpleTimeView-timer">
                {`${mins}:${secs < 10 ? '0' : ''}${secs}`}
            </div>
            { children }
        </div>
    );
}
const mapStateToProps = (state) => ({
    secondsLeft: state.time.secondsLeft,
});
export default connect(mapStateToProps)(SimpleTimeView);
