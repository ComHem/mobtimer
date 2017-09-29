import React from 'react';
import './RadialCounter.css';

const RadialCounter = ({value, maxValue, size, className}) => {
    const radius = size / 2;
    const strokeWidth = 50;
    const innerRadius = radius - (strokeWidth / 2);
    const dashArray = 2 * Math.PI * innerRadius;
    const dashOffset = dashArray * (value / maxValue );
    return (
        <svg className={`RadialCounter ${className}`} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle cx={radius} cy={radius} r={innerRadius} fill="none" strokeWidth={strokeWidth} stroke="#0f0" />
            <circle cx={radius} cy={radius} r={innerRadius} fill="none" strokeWidth={strokeWidth} stroke="#080" strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
        </svg>
    );
};

export default RadialCounter;
