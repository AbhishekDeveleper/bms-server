const validate = (bookTitle, bookAuthor, bookIsbn, publishDate, bookCategory) => {
    if (bookTitle == "" ||
        bookAuthor == "" ||
        bookIsbn == "" ||
        publishDate == "" ||
        bookCategory == "") {
        return false;
    }
    else
        return true;
};
export default validate;
