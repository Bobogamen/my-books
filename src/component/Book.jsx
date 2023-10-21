import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {getAuthorById} from "../api/service";

function Author() {
    const {id} = useParams()
    const [author, setAuthor] = useState([])
    const [books, setBooks] = useState([])

    useEffect(() => {
        getAuthorById(id).then(response => {
            setAuthor(response.data.name)
            setBooks(response.data.books)
        })
    })


    return (
        <div className="container">
            <div className="row">
                <h2>{author}</h2>
                <table className="table table-sm table-bordered text-center align-middle">
                    <thead className="h6">
                    <tr>
                        <th>Заглавие</th>
                    </tr>
                    </thead>
                    <tbody className="h6">
                    {
                        books.map(b => (
                            <tr>
                                <td>{b}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Author;