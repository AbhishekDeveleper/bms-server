var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BookService {
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    addBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!book.bookIsbn || !book.bookTitle) {
                throw new Error("Missing required fields: ISBN and Title are required.");
            }
            yield this.bookRepository.addBook(book);
            return book;
        });
    }
    deleteBook(bookIsbn) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookRepository.deleteBook(bookIsbn);
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bookRepository.getBooks();
        });
    }
    updateBook(bookIsbn, book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bookRepository.updateBook(bookIsbn, book);
        });
    }
}
