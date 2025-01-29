import { Books as BookRepository } from "./bookInterface.js";
import { BookRequestBody } from "../types/books.js";

export class BookService {
  private bookRepository: BookRepository;

  constructor(bookRepository: BookRepository) {
    this.bookRepository = bookRepository;
  }

  async addBook(book: BookRequestBody): Promise<BookRequestBody> {

    if (!book.bookIsbn || !book.bookTitle) {
      throw new Error("Missing required fields: ISBN and Title are required.");
    }

    await this.bookRepository.addBook(book);
    return book;
  }

  async deleteBook(bookIsbn: string): Promise<void> {
    await this.bookRepository.deleteBook(bookIsbn);
  }

  async getBooks(): Promise<BookRequestBody[]> {
    return await this.bookRepository.getBooks();
  }

  async updateBook(bookIsbn: string, book: Partial<BookRequestBody>): Promise<void> {
    await this.bookRepository.updateBook(bookIsbn, book);
  }
}
