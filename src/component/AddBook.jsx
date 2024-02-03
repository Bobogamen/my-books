import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook, getAllAuthors } from "../api/service";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function AddBook() {
    const [loading, setLoading] = useState(true);
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAuthors().then((response) => {
            setAuthors(response.data);
            setLoading(false)
        }).catch(function (err) {
            return null
        })
            .catch(function (err) {
                console.log(err.message)
            });
    }, [authors]);

    useEffect(() => {
        setShowButton(title.length >= 3)

        if (title.length > 0) {
            setIsNameValid(false)
            if (title.length >= 3) {
                setIsNameValid(true)
            }
        }
    }, [title])

    const addOrUpdateBook = (event) => {
        event.preventDefault();

        if (authorId === 0) {
            alert(t('Please, choose author'))
        } else {
            addBook(title, authorId).then((response) => {
                if (response.status === 200) {
                    if (response.data === false) {
                        alert(t('Bad data was sent'))
                    } else {
                        navigate('/books');
                    }
                } else {
                    alert(t('Error sending data'))
                }
            });
        }
    };

    const changeTitleHandler = (event) => {
        setTitle(event.target.value);
    };

    const changeAuthorIdHandler = (event) => {
        setAuthorId(event.target.selectedOptions[0].id);
    };

    const {t} = useTranslation();

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container my-2">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                    {authors.length > 0 ?
                        <form>
                            <h4 className="p-0 m-0">{t('Add')} {t('Book')}</h4>
                            <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                                {t('Title')} {t('must be at least 3 symbols')}
                            </small>
                            <div className="form-group">
                                <label>{t('Title')}:</label>
                                <input placeholder={t('Title')} name="title" value={title} onChange={changeTitleHandler} className="form-control" />
                            </div>
                            <div className="d-grid mb-1">
                                <label>{t('Author')}: </label>
                                <select className="mx-1" onChange={changeAuthorIdHandler}>
                                    <option value="">{t('Choose')} {t('Author')}</option>
                                    {authors.map((a) => (
                                        <option key={a.id} id={a.id}>
                                            {a.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {showButton ?
                                <button className="btn btn-success" onClick={addOrUpdateBook}>
                                    {t('Save')}
                                </button> : null
                            }
                            <button className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>
                            {t('Cancel')}
                            </button>
                        </form>
                        :
                        <div>
                            <p className="text-bg-danger d-block width-fit-content px-1 rounded-1 m-auto">{t('Add')} {t('at least one author')}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddBook;
