import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../api/service';

function ListAllBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getAllBooks().then(response => {
            setBooks(response.data)
        })
            .then(res => res.json)
            .catch(res => res.json)
    }, [books]);

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-2 m-auto">Книги {books.length}бр.</h2>
                <a href="/add-book">
                    <button className="btn btn-success fw-bold">Добави</button>
                </a>
            </div>
            <div className="container">
                {books.length > 0 ?
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
                    :
                    <div>
                        <p className="text-bg-danger d-block width-fit-content px-1 rounded-1 m-auto">Списъкът е празен</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ListAllBooks;
