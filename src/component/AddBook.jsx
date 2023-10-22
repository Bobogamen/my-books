import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook, getAllAuthors } from "../api/service";

function AddBook() {
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState(0);
    const [isNameValid, setIsNameValid] = useState(true);
    const [showButton, setShowButton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAuthors().then((response) => {
            setAuthors(response.data);
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
            alert('Моля, изберете автор')
        } else {
            addBook(title, authorId).then((response) => {
                if (response.status === 200) {
                    if (response.data === false) {
                        alert('Изпратени грешни данни')
                    } else {
                        navigate('/books');
                    }
                } else {
                    alert("Грешка при изпращането на данни!")
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

    return (
        <div className="container my-2">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                    {authors.length > 0 ?
                        <form>
                            <h4 className="p-0 m-0">Добави книга</h4>
                            <small className={`bg-danger px-1 rounded text-white ${isNameValid ? 'hidden' : ''}`}>
                                Името трябва да е поне 3 символа
                            </small>
                            <div className="form-group">
                                <label> Заглавие: </label>
                                <input placeholder="Заглавие" name="title" value={title} onChange={changeTitleHandler} className="form-control" />
                            </div>
                            <div className="d-grid mb-1">
                                <label>Автор: </label>
                                <select className="mx-1" onChange={changeAuthorIdHandler}>
                                    <option value="">Изберете автор</option>
                                    {authors.map((a) => (
                                        <option key={a.id} id={a.id}>
                                            {a.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {showButton ?
                                <button className="btn btn-success" onClick={addOrUpdateBook}>
                                    Запази
                                </button> : null
                            }
                            <button className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>
                                Отказ
                            </button>
                        </form>
                        :
                        <div>
                            <p className="text-bg-danger d-block width-fit-content px-1 rounded-1 m-auto">Добавете поне един автор</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default AddBook;
