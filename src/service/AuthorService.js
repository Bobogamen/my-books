import axios  from "axios";

const BOOKS_URL = "http://localhost:8080/books"
class BookService {

    getAllBooks() {
        return  axios.get(BOOKS_URL)
    }
}

export default new BookService();