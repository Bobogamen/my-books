import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { deleteAuthorById, deleteBookById, editAuthorById, getAuthorById } from "../api/service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function Author() {
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const [author, setAuthor] = useState({
        id: '',
        name: '',
        books: []
    });
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        getAuthorById(id).then(response => {
            setAuthor(response.data)
            setLoading(false)
        });
    }, [id]);

    useEffect(() => {
        setShowButton(author.name.length >= 3)

        if (author.name.length > 0) {
            setIsNameValid(false)
            if (author.name.length >= 3) {
                setIsNameValid(true)
            }
        }
    }, [author.name.length])

    const changeNameHandler = (event) => {
        setAuthor({
            ...author,
            name: event.target.value
        })
    }

    const changeAuthorName = () => {
        if (editAuthorById(author.id, author.name)) {
            navigate("/authors")
        }
    }

    const deleteAuthor = () => {
        if (window.confirm(t('Are you sure? Deleting the author will also delete all his books!'))) {
            if (deleteAuthorById(id)) {
                navigate("/books")
            }
        }
    }

    const deleteBook = (event) => {
        if (window.confirm(t('Are you sure?'))) {
            if (deleteBookById(event.target.id)) {
                alert("The book has been deleted!")
                window.location.reload()
            }
        }
    }

    const { t } = useTranslation();

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <div className="container">
                <div className="card my-2 p-2">
                    <form className="mb-3">
                        <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                            {t('Name')} {t('must be at least 3 symbols')}
                        </small>
                        <h2>{t('Author')}:</h2>
                        <div>
                            <input className="h3 d-inline-block text-center px-2"
                                type="text"
                                value={author.name} onChange={changeNameHandler} />
                        </div>
                        {showButton ?
                            <span id={author.id} className="btn btn-success my-4" onClick={changeAuthorName}>{t('Save')}</span>
                            :
                            <span id={author.id} className="btn btn-success my-4 hidden" onClick={changeAuthorName}>{t('Save')}</span>
                        }
                    </form>
                </div>
                <table className="table table-sm table-bordered table-secondary">
                    <thead className="h6">
                        <tr>
                            <th colSpan={2}>
                                <h4>{t('Books')}</h4>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="h6 border-1">
                        {
                            author.books.map(b => (
                                <tr key={b.id}>
                                    <td><a href={`/book/${b.id}`}>{b.title}</a></td>
                                    <td>
                                        <button id={b.id} className="btn btn-danger px-2 py-0" onClick={deleteBook}>
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <span id={id} className="btn btn-danger mt-5" onClick={deleteAuthor}>{t('Delete all')}</span>
                </div>
            </div>
        </div>
    );
}

export default Author;