import React, {useEffect, useState} from 'react';
import {getAllAuthors} from "../api/service";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function ListAllAuthors() {
    const [loading, setLoading] = useState(true)
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        getAllAuthors().then(response => {
            setAuthors(response.data)
        }).then(res => res.json)
        .catch(res => res.json)

        setLoading(false)
    }, [authors])

    const { t } = useTranslation();

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-2 m-auto">{t('Authors')} {authors.length}{t('pcs')}.</h2>
                <a href="/add-author">
                    <button className="btn btn-warning fw-bold">{t('Add')}</button>
                </a>
            </div>
            <div className="d-flex col-11 m-auto">
                <table className="table table-sm table-bordered text-center align-middle">
                    <thead className="h6">
                    <tr>
                        <th>{t('Tittle')}</th>
                        <th>{t('Books')}</th>
                    </tr>
                    </thead>
                    <tbody className="h6">
                    {
                        authors.map(a =>
                            <tr key={a.id}>
                                <td>
                                    <a href={`/author/${a.id}`}>{a.name}</a>
                                </td>
                                <td>{a.books.length}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListAllAuthors;