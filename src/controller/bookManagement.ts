import { RequestHandler } from "express";
import validate from "../validator/validateInput.js";
export { Request, Response } from "express";
import { BookRequestBody } from "../types/books.js";
import fs from "node:fs";
export const addBook: RequestHandler<{}, {}, BookRequestBody> = async (
  req,
  res
) => {
  try {
    const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } =
      req.body;
    let jsonData: BookRequestBody[];

    if (validate(bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory)) {
      fs.readFile("data.json", "utf8", async (err, data) => {
        if(err) console.log(err)
        jsonData = await JSON.parse(data);
        jsonData.push({
          bookTitle,
          bookAuthor,
          bookIsbn,
          publishDate,
          bookCategory,
        });
        if (jsonData) {
          fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
            if (err) {
              console.log("Something went wrong in writing file.");
            }
          });
        }
      });

      res.status(201).json({
        status: "success",
        message: "book added successfully",
        data: {
          bookTitle,
          bookAuthor,
          bookIsbn,
          publishDate,
          bookCategory,
        },
      });
    } else {
      res.status(403).json({
        message: "something went wrong!",
      });
    }
  } catch (err:unknown) {
    res.status(403).json({
      message: "some fields are missing and bookIsbn is number",
    });
  }
};

export const deleteBookWithId: RequestHandler<{ id: number }, {}, {}> = async (
  req,
  res
) => {
  const { id } = req.params;

  if (id) {
    
    fs.readFile("data.json", "utf8", async (err, data) => {
      if (err) console.log(err);
      const jsonData = await JSON.parse(data);
      const filterData = jsonData.filter((books: any) => books.bookIsbn != id);
      
      fs.writeFile("data.json", JSON.stringify(filterData), (err) => {
        if (err) console.log(err);
      });
      res.status(200).json({
        status: "success",
        message: "Deleted successfully !",
        filterData,
      });
    });
  } else {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong !",
    });
  }
};



export const getBook: RequestHandler = async (req, res) => {
  try {
    fs.readFile("data.json", "utf8", (error, data) => {
      if (error) {
        res.status(400).json({
          status: "fail",
          message: "Something went wrong !",
        });
      } else {
        let bookData = JSON.parse(data);

        res.status(200).json({
          status: "success",
          data: bookData,
        });
      }
    });
  } catch (err: unknown) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

export const updateBookWithId: RequestHandler<
  { id: string },
  {},
  Partial<BookRequestBody>
> = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } =
      req.body;
    let message: string = "";

    fs.readFile("data.json", "utf8", async (err, data) => {
      if (err) console.log(err);
      let jsonData = await JSON.parse(data);

      if (jsonData) {
        const filteredData = jsonData.filter(
          (books: { bookIsbn: string }) => books.bookIsbn == id
        );
        let remainData = jsonData.filter(
          (books: { bookIsbn: string }) => books.bookIsbn != id
        );

        if (filteredData.length < 1) {
          console.log("comes in");
          message = "Book with this id is unavailable";
        }

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

        fs.writeFile("data.json", JSON.stringify(remainData), (err) => {
          if (err) {
            console.log("something went wrong while writig data in file", err);
          }
        });
      }
    });

    res.status(200).json({
      message: message === "" ? "updated Successfully" : message,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {  console.log(err.message) }
    res.status(400).json({
      status: "error",
      messages:  "Something went wrong !",
    });
  }
};

