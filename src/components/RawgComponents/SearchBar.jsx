import React, { useState, useEffect } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, defaultValue = '' }) {
    const [searchTerm, setSearchTerm] = useState(defaultValue);

    useEffect(() => {
        if (defaultValue) {
            setSearchTerm(defaultValue);
        }
    }, [defaultValue]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="zoeken naar games"
                className="search-input"
            />
        </div>
    );
}

export default SearchBar;