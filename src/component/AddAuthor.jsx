import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {addAuthor} from '../api/service';

function AddAuthor() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const addOrUpdateAuthor = async (event) => {
        event.preventDefault();

        if (await addAuthor(name)) {
            navigate('/authors');
        } else {
            alert("Грешка при изпращането на данни!")
        }
    }

    const changeNameHandler = (event) => {
        setName(event.target.value);
    }

    return (
        <div className="container my-2">
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <div className="card-body">
                    <form>
                        <h4>Добави автор</h4>
                        <div className="form-group my-2">
                            <label>Име: </label>
                            <input
                                placeholder="Име"
                                name="name"
                                value={name}
                                onChange={changeNameHandler}
                                className="form-control"
                            />
                        </div>
                        <button className="btn btn-success" onClick={addOrUpdateAuthor}>Запази</button>
                        <a href="/authors">
                            <span className="btn btn-danger" style={{marginLeft: '0.5rem'}}>Назад</span>
                        </a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddAuthor;
