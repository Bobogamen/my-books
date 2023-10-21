import React, {Component} from 'react';
import AuthorService from "../service/AuthorService";
import Author from "./Author";

class ListAllAuthor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authors: []
        }
    }

    componentDidMount() {
        AuthorService.getAllAuthors().then(response => {
            this.setState({authors: response.data})
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>Автори</h2>
                    <table className="table table-sm table-bordered">
                        <thead className="h6">
                        <tr>
                            <th>Заглавие</th>
                            <th>Книги</th>
                        </tr>
                        </thead>
                        <tbody className="h6">
                        {
                            this.state.authors.map(a =>
                                <tr key={a.id}>
                                    <td><a href='/author:${id}' id={a.id}>{a.name}</a></td>
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
}

export default ListAllAuthor;