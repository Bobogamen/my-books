import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

    const { t } = useTranslation()

    return (
        <div className="d-inline-flex mx-1">
            <input
                className="w-75"
                type="text"
                placeholder={t('Searching')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-success btn-sm mx-1" onClick={handleSearch}>
                {t('Search')}
            </button>
        </div>
    );
}

export default SearchBar;
