import { BookRequestBody } from "../types/books.js";

export interface Books {
  addBook(book: BookRequestBody): Promise<void>;
  deleteBook(bookIsbn: string): Promise<void>;
  getBooks(): Promise<BookRequestBody[]>;
  updateBook(bookIsbn: string, book: Partial<BookRequestBody>): Promise<void>;
}
