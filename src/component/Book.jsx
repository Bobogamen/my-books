import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { deleteBookById, editBookById, getAllAuthors, getBookById } from "../api/service";
import AuthorSelect from './AuthorSelect';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function Book() {
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: {
            id: '',
            name: ''
        }
    });
    const [authors, setAuthors] = useState([]);
    const [bookAuthor, setBookAuthor] = useState({});
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id).then((response) => {
            setBook(response.data);
        });
    }, [id]);

    useEffect(() => {
        getAllAuthors().then((response) => {
            setAuthors(response.data);
        });

        setLoading(false)
    }, []);

    useEffect(() => {
        setBookAuthor({
            value: book.author.id,
            label: book.author.name
        })
    }, [book.author])

    useEffect(() => {
        setShowButton(book.title.length >= 3)

        if (book.title.length > 0) {
            setIsNameValid(false)
            if (book.title.length >= 3) {
                setIsNameValid(true)
            }
        }
    }, [book.title.length])

    const deleteBook = async () => {
        if (window.confirm(t('Are you sure?'))) {
            const deleted = await deleteBookById(id);
            if (deleted) {
                alert(t('The book has been deleted!'));
                navigate('/books');
            }
        }
    }

    const changeTitleHandler = (event) => {
        setBook({
            ...book,
            title: event.target.value,
        });
    };

    const changeAuthorHandler = (selectedOption) => {
        setBookAuthor(selectedOption)
    };

    const editBook = async () => {
        const bookForSend = {
            id: book.id,
            title: book.title,
            author: {
                id: bookAuthor.value,
                name: bookAuthor.label
            }
        }

        if (await editBookById(bookForSend)) {
            navigate('/books');
        }
    }

    const { t } = useTranslation();

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <div className="container">
                <div className="card m-auto mt-2 mb-5 p-2">
                    <form className="card-body">
                        <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                            {t('Tittle')} {t('must be at least 3 symbols')}
                        </small>
                        <h2 className="fw-bold p-0 m-0">{t('Title')}: </h2>
                        <div className="d-grid">
                            <input
                                className="h4 d-inline-block text-center px-2"
                                type="text"
                                value={book.title}
                                onChange={changeTitleHandler}
                            />
                        </div>
                        <div className="d-grid width-fit-content m-auto mt-2">
                            <h3 className="fw-bold p-0 m-0">{t('Author')}: </h3>
                            <AuthorSelect
                                authors={authors}
                                selectedAuthor={bookAuthor}
                                onAuthorChange={changeAuthorHandler}
                            />
                        </div>
                        {showButton ?
                            <span id={id} className="btn btn-success my-5" onClick={editBook}>
                                {t('Save')}
                            </span>
                            :
                            <span id={id} className="btn btn-success my-5 hidden" onClick={editBook}>
                                {t('Save')}
                            </span>
                        }
                    </form>
                </div>
                <span id={id} className="btn btn-danger mt-5" onClick={deleteBook}>
                    {t('Delete')}
                </span>
            </div>
        </div>
    );
}


export default Book;