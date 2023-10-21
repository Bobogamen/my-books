import React, {useEffect, useState} from 'react';
import {getAllBooks} from '../api/service';

function ListAllBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks().then(response => {
            setBooks(response.data)
        })
    }, [books]);

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-1 m-auto">Списък книги</h2> :
                <a href="/add-book">
                    <button className="btn btn-success fw-bold">Добави</button>
                </a>
            </div>
            <div className="container">
                <table className="table table-sm table-bordered text-center align-middle">
                    <thead className="h6">
                    <tr>
                        <th>Заглавие</th>
                        <th>Автор</th>
                    </tr>
                    </thead>
                    <tbody className="h6">
                    {books.map(b => (
                        <tr key={b.id}>
                            <td>
                                <a href={`/book/${b.id}`}>{b.title}</a>
                            </td>
                            <td>
                                <a href={`/author/${b.author.id}`}>{b.author.name}</a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAllBooks;
