import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAuthor } from '../api/service';
import { useTranslation } from 'react-i18next';

function AddAuthor() {
    const [name, setName] = useState('');
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setShowButton(name.length > 2)

        if (name.length > 0) {
            setIsNameValid(false)
            if (name.length >= 3) {
                setIsNameValid(true)
            }
        }

    }, [name])

    const addOrUpdateAuthor = async (event) => {
        event.preventDefault();

        if (await addAuthor(name)) {
            navigate('/authors');
        } else {
            alert(t('Error sending data'));
        }
    }

    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    const { t } = useTranslation();

    return (
        <div className="container my-2">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                    <form>
                        <h4 className="p-0 m-0">{t('Add')} {t('Author')}</h4>
                        <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                            {t('Name')} {t('must be at least 3 symbols')}
                        </small>
                        <div className="form-group">
                            <label>{t('Name')}: </label>
                            <input
                                placeholder={t('Name')}
                                name={t('Name')}
                                value={name}
                                onChange={changeNameHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="mt-4">
                            {showButton ? (
                                <button className="btn btn-success" onClick={addOrUpdateAuthor}>{t('Save')}</button>
                            ) :
                                null
                            }
                            <a href="/authors">
                                <span className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>{t('Back')}</span>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAuthor;
