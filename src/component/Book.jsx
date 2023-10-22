import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { deleteBookById, editBookById, getAllAuthors, getBookById } from "../api/service";
import { useNavigate } from "react-router-dom";

function Book() {
    const { id } = useParams()
    const [book, setBook] = useState([])
    const [authors, setAuthors] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getBookById(id).then(response => {
            setBook(response.data)
        });

        getAllAuthors().then(response => {
            setAuthors(response.data)
        })

    }, [id]);

    const deleteBook = () => {
        if (window.confirm("Сигурни ли сте?")) {
            if (deleteBookById(id)) {
                alert("Книгата е изтрита!")
                navigate('/books')
                window.location.reload()
            }
        }
    }

    const changeTitleHandler = (event) => {
        setBook({
            ...book,
            title: event.target.value
        });
    };

    const changeAuthorIdHandler = (event) => {
        setBook({
            ...book,
            author: {
                id: event.target.selectedOptions[0].id
            }
        })
    };

    const editBook = async () => {
        if (await editBookById(book)) {
            navigate("/books")
            window.location.reload()
        }
    }


    return (
        <div>
            <div className="container">
                <div className="card m-auto mt-2 mb-5 p-2">
                    <h2 className="fw-bold">Заглавие: </h2>
                    <form className="card-body">
                        <div>
                            <input className="d-inline-block px-2"
                                type="text"
                                value={book.title}
                                onChange={changeTitleHandler}
                            />
                        </div>
                        <div className="d-grid width-fit-content m-auto">
                            <h3 className="fw-bold">Автор: </h3>
                            <select className="mx-1" onChange={changeAuthorIdHandler} value={book.author.id}>
                                {authors.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span id={id} className="btn btn-success my-3" onClick={editBook}>Запази</span>
                    </form>
                </div>
                <span id={id} className="btn btn-danger mt-5" onClick={deleteBook}>Изтрий</span>
            </div>
        </div>
    )
        ;
}

export default Book;