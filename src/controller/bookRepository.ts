
import fs from "fs/promises";
import { BookRequestBody } from "../types/books.js";
import { Books as BookRepository } from "./bookInterface.js";

export class FileSystemBookRepository implements BookRepository {
  private filePath = "data.json";

  async addBook(book: BookRequestBody): Promise<void> {
    const data = await this.getBooks();
    data.push(book);
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async deleteBook(bookIsbn: string): Promise<void> {
    const data = await this.getBooks();
    const filteredData = data.filter((book) => book.bookIsbn !== bookIsbn);
    await fs.writeFile(this.filePath, JSON.stringify(filteredData, null, 2));
  }

  async getBooks(): Promise<BookRequestBody[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data);
    } catch (err) {
      throw new Error("Failed to read data from file.");
    }
  }

  async updateBook(id: string, book: Partial<BookRequestBody>): Promise<void> {
    const data = await this.getBooks();
    const index = data.findIndex((b) => b.bookIsbn === id);

      if (index === -1) throw new Error("Book not found");
      let filteredData = data.filter((b) => b.bookIsbn == id);
      let remainData = data.filter((b) => b.bookIsbn != id);
      const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = book;
        if (filteredData.length > 0) {
          const {
            bookTitle: title,
            bookAuthor: author,
            bookIsbn: isbn,
            publishDate: published,
            bookCategory: gener,
          } = filteredData[0];
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

    await fs.writeFile(this.filePath, JSON.stringify(remainData, null, 2));
  }
}
