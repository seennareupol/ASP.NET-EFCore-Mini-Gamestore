import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NavMenu: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        setIsDarkMode(currentTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        setIsDarkMode(!isDarkMode);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <NavLink className="navbar-brand mb-0 h1 d-flex align-items-center" to="/">
                    <i className="bi bi-controller me-2 text-primary"></i>
                    Game Store
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <div className="d-flex align-items-center">
                        <a href="http://localhost:5018/swagger" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-secondary me-3 d-flex align-items-center border-0 text-muted hover-text-white">
                            <i className="bi bi-braces me-2"></i> API Docs
                        </a>
                        <button onClick={toggleTheme} className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center border-0 text-muted" style={{ width: '36px', height: '36px', transition: 'all 0.2s' }}>
                            {isDarkMode ? <i className="bi bi-sun-fill fs-5"></i> : <i className="bi bi-moon-fill fs-5"></i>}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;
