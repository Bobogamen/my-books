import React, { Component } from 'react';
import SearchBar from "./Search";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div>
                <header className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="d-flex mx-2 m-auto">
                        <a href="/books">
                            <button className="btn btn-secondary btn-sm mx-1">Книги</button>
                        </a>
                        <a href="/authors">
                            <button className="btn btn-primary btn-sm">Автори</button>
                        </a>
                        <SearchBar />
                    </div>
                </header>
            </div>
        );
    }
}

export default Header;
