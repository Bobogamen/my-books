import React, { useCallback, useEffect } from 'react';
import SearchBar from "./Search";
import eng from "../assets/images/eng.png"
import bg from "../assets/images/bg.png"
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation()

    const changeLanguage = useCallback((lng) => {
        i18n.changeLanguage(lng)
        document.title = `${t('My')} ${t('Books')}`
        localStorage.setItem('selectedLanguage', lng);
    }, [i18n, t])

    useEffect(() => {
        changeLanguage(localStorage.getItem('selectedLanguage') || 'bg')
    }, [changeLanguage])

    const languageImage = i18n.language === 'bg' ? eng : bg;

    return (
        <div>
            <header className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="d-flex mx-2 m-auto">
                    <a href="/books">
                        <button className="btn btn-secondary btn-sm mx-1">{t('Books')}</button>
                    </a>
                    <a href="/authors">
                        <button className="btn btn-primary btn-sm">{t('Authors')}</button>
                    </a>
                    <SearchBar />
                    <img src={languageImage} alt={i18n.language} className="i18-img m-auto" onClick={() => changeLanguage(i18n.language === 'bg' ? 'en' : 'bg')} />
                </div>
            </header>
        </div>
    );
}


export default Header;
