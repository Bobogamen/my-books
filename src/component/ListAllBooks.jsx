import React, { useEffect, useState } from 'react';
import { getAllBooks } from '../api/service';
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

function ListAllBooks() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([]);
    const [sortedBooks, setSortedBooks] = useState([]);
    const [sortByTitle, setSortByTitle] = useState(false);
    const [sortByAuthor, setSortByAuthor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllBooks();
                const data = response.data;
                setBooks(data);
                setSortedBooks([...data]);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchData();
    }, []);

    const handleSortByTitle = () => {
        if (sortByTitle) {
            setSortedBooks([...books].sort((a, b) => b.title.localeCompare(a.title)))
        } else {
            setSortedBooks([...books].sort((a, b) => a.title.localeCompare(b.title)))
        }
        setSortByTitle(!sortByTitle);
    };

    const handleSortByAuthor = () => {
        if (sortByAuthor) {
            setSortedBooks([...books].sort((a, b) => b.author.name.localeCompare(a.author.name)))
        } else {
            setSortedBooks([...books].sort((a, b) => a.author.name.localeCompare(b.author.name)))
        }
        setSortByAuthor(!sortByAuthor);
    };

    const { t } = useTranslation()

    if (loading) {
        return <Loading/>
    }

    return (
        <div>
            <div className="d-flex justify-content-center my-2">
                <h2 className="text-center fw-bold mx-2 m-auto">{t('Books')} {books.length}{t('pcs')}.</h2>
                <a href="/add-book">
                    <button className="btn btn-success fw-bold">{t('Add')}</button>
                </a>
            </div>
            <div className="container">
                {sortedBooks.length > 0 ?
                    <table className="table table-sm table-bordered text-center align-middle">
                        <thead className="h6">
                            <tr>
                                <th>
                                    <div className="h4 p-0 m-0">
                                        <span className="mx-1 fw-bold">{t('Title')}</span>
                                        { sortByTitle ?
                                            <BsSortAlphaDown className="border border-black rounded h3" onClick={handleSortByTitle}/>
                                            :
                                            <BsSortAlphaDownAlt className="border border-black rounded h3" onClick={handleSortByTitle}/>
                                        }
                                    </div>
                                </th>
                                <th>
                                    <div className="h4 p-0 m-0">
                                        <span className="mx-1 fw-bold">{t('Author')}</span>
                                        { sortByAuthor ?
                                            <BsSortAlphaDown className="border border-black rounded h3" onClick={handleSortByAuthor}/>
                                            :
                                            <BsSortAlphaDownAlt className="border border-black rounded h3" onClick={handleSortByAuthor}/>
                                        }
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="h6">
                            {sortedBooks.map(b => (
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
                        <p className="text-bg-danger d-block width-fit-content px-1 rounded-1 m-auto">{t('The list is empty')}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default ListAllBooks;
