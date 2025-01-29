import { RequestHandler } from "express";
import { BookService } from "./bookService.js";
import { FileSystemBookRepository } from "./bookRepository.js";
import { BookRequestBody } from "../types/books.js";

const bookRepository = new FileSystemBookRepository();
const bookService = new BookService(bookRepository);

export const addBook: RequestHandler = async (req, res) => {
  try {
    const newBook = await bookService.addBook(req.body);
    res.status(201).json({
      status: "success",
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
    
    });
  }
};

export const deleteBookWithId: RequestHandler<{ id: string }, {}, {}> = async (req, res) => {
  const { id } = req.params;

  try {
    await bookService.deleteBook(id);
    res.status(200).json({
      status: "success",
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
     
    });
  }
};

export const getBook: RequestHandler = async (req, res) => {
  try {
    const books = await bookService.getBooks();
    res.status(200).json({
      status: "success",
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      
    });
  }
};

export const updateBookWithId: RequestHandler<{ id: string }, {}, Partial<BookRequestBody>> = async (req, res) => {
  const { id } = req.params;
  const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = req.body;

  try {
    await bookService.updateBook(id, { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory });
    res.status(200).json({
      status: "success",
      message: "Book updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
     
    });
  }
};

