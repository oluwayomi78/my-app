import React, { useEffect, useState } from 'react';
import '../css/Loader.css';

const Dashboardloader = ({ show }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!show) {
            setFadeOut(true);
            const timer = setTimeout(() => setFadeOut(false), 500); // Remove after fade
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (!show && !fadeOut) return null;

    return (
        <div className={`loader-overlay ${!show ? 'fade-out' : ''}`}>
            <div className="loader-content">
                <img
                    src="/precious-icon.png"
                    alt="Loading Precious Bank"
                    className="loader-logo"
                />
                <p className="text-muted mt-2"></p>
            </div>
        </div>
    );
};

export default Dashboardloader;
