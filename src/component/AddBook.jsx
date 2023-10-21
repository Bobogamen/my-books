import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook, getAllAuthors } from "../api/service";

function AddBook() {
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [authorId, setAuthorId] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAuthors().then((response) => {
            setAuthors(response.data);
        });
    }, [authors]);

    const addOrUpdateBook = (event) => {
        event.preventDefault();
        addBook(title, authorId).then((response) => {
            if (response.status === 200) {
                navigate('/books');
            } else {
                alert("Грешка при изпращането на данни!")
            }
        });
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
                        <h4>Добави книга</h4>
                        <div className="form-group my-1">
                            <label> Заглавие: </label>
                            <input
                                placeholder="Заглавие"
                                name="title"
                                value={title}
                                onChange={changeTitleHandler}
                                className="form-control"
                            />
                        </div>
                        <div className="d-grid mb-1">
                            <label>Автор: </label>
                            <select className="mx-1" onChange={changeAuthorIdHandler}>
                                {authors.map((a) => (
                                    <option key={a.id} id={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className="btn btn-success" onClick={addOrUpdateBook}>
                            Запази
                        </button>
                        <button className="btn btn-danger" style={{marginLeft: '0.5rem'}}>
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
