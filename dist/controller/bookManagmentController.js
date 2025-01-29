var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BookService } from "./bookService.js";
import { FileSystemBookRepository } from "./bookRepository.js";
const bookRepository = new FileSystemBookRepository();
const bookService = new BookService(bookRepository);
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield bookService.addBook(req.body);
        res.status(201).json({
            status: "success",
            message: "Book added successfully",
            data: newBook,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
        });
    }
});
export const deleteBookWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield bookService.deleteBook(id);
        res.status(200).json({
            status: "success",
            message: "Book deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
        });
    }
});
export const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookService.getBooks();
        res.status(200).json({
            status: "success",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
        });
    }
});
export const updateBookWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = req.body;
    try {
        yield bookService.updateBook(id, { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory });
        res.status(200).json({
            status: "success",
            message: "Book updated successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            status: "error",
        });
    }
});
