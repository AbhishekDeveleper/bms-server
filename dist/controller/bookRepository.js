var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs/promises";
export class FileSystemBookRepository {
    constructor() {
        this.filePath = "data.json";
    }
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getBooks();
            data.push(book);
            yield fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
        });
    }
    deleteBook(bookIsbn) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getBooks();
            const filteredData = data.filter((book) => book.bookIsbn !== bookIsbn);
            yield fs.writeFile(this.filePath, JSON.stringify(filteredData, null, 2));
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.readFile(this.filePath, "utf8");
                return JSON.parse(data);
            }
            catch (err) {
                throw new Error("Failed to read data from file.");
            }
        });
    }
    updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getBooks();
            const index = data.findIndex((b) => b.bookIsbn === id);
            if (index === -1)
                throw new Error("Book not found");
            let filteredData = data.filter((b) => b.bookIsbn == id);
            let remainData = data.filter((b) => b.bookIsbn != id);
            const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = book;
            if (filteredData.length > 0) {
                const { bookTitle: title, bookAuthor: author, bookIsbn: isbn, publishDate: published, bookCategory: gener, } = filteredData[0];
                remainData.push({
                    bookTitle: bookTitle || title,
                    bookAuthor: bookAuthor || author,
                    bookIsbn: bookIsbn || isbn,
                    publishDate: publishDate || published,
                    bookCategory: bookCategory || gener,
                });
            }
            // const updatedBook = { ...data[index], ...book };
            // data[index] = updatedBook;
            yield fs.writeFile(this.filePath, JSON.stringify(remainData, null, 2));
        });
    }
}
