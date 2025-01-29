import express from "express";
const router = express.Router();
import { addBook, deleteBookWithId, getBook, updateBookWithId, } from "../controller/bookManagmentController.js";
router.post("/books", addBook);
router.delete("/books/:id", deleteBookWithId);
router.get("/books", getBook);
router.patch("/books/:id", updateBookWithId);
export default router;
