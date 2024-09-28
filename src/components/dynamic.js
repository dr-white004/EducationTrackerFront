import React, { useState } from 'react';
import '../dynamic.css';
import Header from './header';

const DynamicBackground = () => {
    const [isBlueBackground, setIsBlueBackground] = useState(true);

    const toggleBackground = () => {
        setIsBlueBackground(!isBlueBackground);
    };

    return (
        <div>
            <Header />
            <div
                className="background"
                style={{
                    background: isBlueBackground ? 'linear-gradient(to bottom, #87CEEB, #ADD8E6)' : 'linear-gradient(to bottom, pink, lightpink)'
                }}
            >
                <div
                    className="wave"
                    style={{ background: isBlueBackground ? '#87CEEB' : 'pink' }}
                ></div>
            </div>
            <button className="toggle-button" onClick={toggleBackground}>
                {isBlueBackground ? 'Pink' : 'Blue'}
            </button>
        </div>
    );
}

export default DynamicBackground;
