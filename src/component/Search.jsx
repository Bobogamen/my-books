import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    let [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchQuery.length === 0) {
            searchQuery = undefined
        }

        navigate(`/search/${searchQuery}`);
    };

    return (
        <div className="d-inline-flex mx-1">
            <input
                className="w-75"
                type="text"
                placeholder="Търсене..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success btn-sm mx-1" onClick={handleSearch}>
                Търси
            </button>
        </div>
    );
}

export default SearchBar;
