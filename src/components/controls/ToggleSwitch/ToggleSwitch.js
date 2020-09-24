import React from 'react';
import './ToggleSwitch.sass';

export default function ToggleSwitch({onToggle, isOn}) {
    return (
        <div className={`toggle-switch`} onClick={onToggle}>
            <div className={`dash ${isOn ? 'dash-on' : ''}`}></div>
            <div className={`ball ${isOn ? 'ball-on' : ''}`}></div>
        </div>
    )
}
