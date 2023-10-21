import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {deleteAuthorById, deleteBookById, editAuthorById, getAuthorById} from "../api/service";
import {useNavigate} from "react-router-dom";

function Author() {
    const {id} = useParams();
    const [author, setAuthor] = useState({
        id: '',
        name: '',
        books: []
    });
    const navigate = useNavigate()

    useEffect(() => {
        getAuthorById(id).then(response => {
            setAuthor(response.data)
        });
    }, []);

    const changeNameHandler = (event) => {
        setAuthor({
            ...author,
            name: event.target.value
        })
    }

    const changeAuthorName = () => {
        if(editAuthorById(author.id, author.name)) {
            navigate("/authors")
        }
    }

    const deleteAuthor = () => {
        if (window.confirm("Сигурен ли си? Изтриването на автора ще изтрие и неговите книги!")) {
            if (deleteAuthorById(id)) {
                navigate("/books")
            }
        }
    }

    const deleteBook = (event) => {
        if (window.confirm("Сигурни ли сте?")) {
            if (deleteBookById(event.target.id)) {
                alert("Книгата е изтрита!")
                window.location.reload()
            }
        }
    }


    return (
        <div>
            <div className="container">
                <div className="card my-2 p-2">
                    <form className="mb-3">
                        <h2>Автор:</h2>
                        <div>
                            <input className="h3 d-inline-block text-center px-2"
                                   type="text"
                                   value={author.name} onChange={changeNameHandler}/>
                        </div>
                        <span id={author.id} className="btn btn-success" onClick={changeAuthorName}>Запази</span>

                    </form>
                </div>
                <table className="table table-sm table-bordered table-secondary">
                    <thead className="h6">
                    <tr>
                        <th colSpan={2}>
                            <h4>Книги</h4>
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
                    <span id={id} className="btn btn-danger mt-5" onClick={deleteAuthor}>Изтрий всичко</span>
                </div>
            </div>
        </div>
    );
}

export default Author;