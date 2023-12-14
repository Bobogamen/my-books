import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import ListAllBooks from "./component/ListAllBooks";
import Header from "./component/Header";
import AddBook from "./component/AddBook";
import AddAuthor from "./component/AddAuthor";
import ListAllAuthors from "./component/ListAllAuthors";
import Author from "./component/Author";
import Book from "./component/Book";
import Result from "./component/Result";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import bgTranslation from '../src/locale/bg.json';
import enTranslation from '../src/locale/eng.json';
import { useEffect } from 'react';

const LANGUAGE_KEY = 'selectedLanguage';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      bg: { translation: bgTranslation },
      en: { translation: enTranslation },
    },
    lng: localStorage.getItem(LANGUAGE_KEY) || 'bg',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const App = () => {
  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
    if (storedLanguage && storedLanguage !== i18n.language) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ListAllBooks />} />
          <Route path="/books" element={<ListAllBooks />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/authors" element={<ListAllAuthors />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/search/:word" element={<Result />} />
          <Route path="/search" element={<Result />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
