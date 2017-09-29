import React, { Component } from 'react';
import forward from '../../images/fast-forward.svg';
import stop from '../../images/stop.svg';
import play from '../../images/play-button.svg';
import pause from '../../images/pause.svg';
import settings from '../../images/equalizer.svg';
import coffee from '../../images/coffee-cup.svg';
import './Icon.css';

const iconMap = {
    play,
    stop,
    pause,
    forward,
    settings,
    coffee,
};

const Icon = ({ onClick, icon, className = '', size = 'medium' }) => (
    <button className={`Icon Icon--${size} ${className}`} onClick={onClick}>
        <figure style={{ backgroundImage: 'url(' + iconMap[icon] + ')' }}/>
    </button>
);

export default Icon;
