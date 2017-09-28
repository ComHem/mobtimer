import React, { Component } from 'react';
import forward from '../../images/fast-forward.svg';
import stop from '../../images/stop.svg';
import play from '../../images/play-button.svg';
import pause from '../../images/pause.svg';
import './Icon.css';

const iconMap = {
    play,
    stop,
    pause,
    forward,
};

const Icon = ({ onClick, icon }) => (
    <button className="Icon" onClick={onClick}><figure style={{ backgroundImage: 'url(' + iconMap[icon] + ')' }}></figure></button>
);

export default Icon;
