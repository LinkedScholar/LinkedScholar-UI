import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../styles/components/navbar.css';

interface NavbarProps {
    toolbarProps?: {
        toggleFilters: () => void;
        toggleGrid: () => void;
        gridActive: boolean;
        filtersActive: boolean;
    };
}

const Navbar: React.FC<NavbarProps> = ({ toolbarProps }) => {
    const location = useLocation();
    const isNetworkPage = location.pathname === '/network';
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleDropdownToggle = (dropdownName: string, isOpen: boolean) => {
        if (isOpen) {
            setActiveDropdown(dropdownName);
        } else if (activeDropdown === dropdownName) {
            setActiveDropdown(null);
        }
    };


    return (
        <nav className="research-navbar">
             <div className="navbar-left">
                <a href="/" className="brand-link">
                    <div className="brand-title-container">
                        <span className="brand-title-linked">Linked</span>
                        <span className="brand-title-scholar">Scholar</span>
                    </div>
                </a>
            </div>

        </nav>
    );
};

export default Navbar;