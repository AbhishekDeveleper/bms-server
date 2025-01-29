var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import validate from "../validator/validateInput.js";
import fs from "node:fs";
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = req.body;
        let jsonData;
        if (validate(bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory)) {
            fs.readFile("data.json", "utf8", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                if (err)
                    console.log(err);
                jsonData = yield JSON.parse(data);
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
            }));
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
        }
        else {
            res.status(403).json({
                message: "something went wrong!",
            });
        }
    }
    catch (err) {
        res.status(403).json({
            message: "some fields are missing and bookIsbn is number",
        });
    }
});
export const deleteBookWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (id) {
        fs.readFile("data.json", "utf8", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                console.log(err);
            const jsonData = yield JSON.parse(data);
            const filterData = jsonData.filter((books) => books.bookIsbn != id);
            fs.writeFile("data.json", JSON.stringify(filterData), (err) => {
                if (err)
                    console.log(err);
            });
            res.status(200).json({
                status: "success",
                message: "Deleted successfully !",
                filterData,
            });
        }));
    }
    else {
        res.status(400).json({
            status: "fail",
            message: "Something went wrong !",
        });
    }
});
export const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fs.readFile("data.json", "utf8", (error, data) => {
            if (error) {
                res.status(400).json({
                    status: "fail",
                    message: "Something went wrong !",
                });
            }
            else {
                let bookData = JSON.parse(data);
                res.status(200).json({
                    status: "success",
                    data: bookData,
                });
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: "error",
            message: err,
        });
    }
});
export const updateBookWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory } = req.body;
        let message = "";
        fs.readFile("data.json", "utf8", (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                console.log(err);
            let jsonData = yield JSON.parse(data);
            if (jsonData) {
                const filteredData = jsonData.filter((books) => books.bookIsbn == id);
                let remainData = jsonData.filter((books) => books.bookIsbn != id);
                if (filteredData.length < 1) {
                    console.log("comes in");
                    message = "Book with this id is unavailable";
                }
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
                fs.writeFile("data.json", JSON.stringify(remainData), (err) => {
                    if (err) {
                        console.log("something went wrong while writig data in file", err);
                    }
                });
            }
        }));
        res.status(200).json({
            message: message === "" ? "updated Successfully" : message,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
        res.status(400).json({
            status: "error",
            messages: "Something went wrong !",
        });
    }
});
