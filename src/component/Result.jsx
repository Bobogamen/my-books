import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {searchBooks} from "../api/service";

function Result() {
    const {word} = useParams()
    const [books, setBooks] = useState([]);

    useEffect(() => {
        searchBooks(word).then(response => {
            setBooks(response.data)
        })
    }, [word]);

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-1 m-auto">Резултати за '{word}'</h2> :
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
                    {books.length > 0 ? books.map(b => (
                        <tr key={b.id}>
                            <td>
                                <a href={`/book/${b.id}`}>{b.title}</a>
                            </td>
                            <td>
                                <a href={`/author/${b.author.id}`}>{b.author.name}</a>
                            </td>
                        </tr>
                    )) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Result;
