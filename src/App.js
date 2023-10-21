import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router';
import ListAllBooks from "./component/ListAllBooks";
import Header from "./component/Header";
import AddBook from "./component/AddBook";
import AddAuthor from "./component/AddAuthor";
import ListAllAuthors from "./component/ListAllAuthors";
import Author from "./component/Author";
import Book from "./component/Book";
import Result from "./component/Result";

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<ListAllBooks/>}/>
                    <Route path="/books" element={<ListAllBooks/>}/>
                    <Route path="/add-book" element={<AddBook/>}/>
                    <Route path="/book/:id" element={<Book/>}/>
                    <Route path="/authors" element={<ListAllAuthors/>}/>
                    <Route path="/author/:id" element={<Author/>}/>
                    <Route path="/add-author" element={<AddAuthor/>}/>
                    <Route path="/search/:word" element={<Result/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
