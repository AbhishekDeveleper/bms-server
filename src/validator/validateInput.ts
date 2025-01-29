const validate = (
  bookTitle: string,
  bookAuthor: string,
  bookIsbn: string,
  publishDate: string,
  bookCategory: string
): boolean => {
  if (
    bookTitle == "" ||
    bookAuthor == "" ||
    bookIsbn == "" ||
    publishDate == "" ||
    bookCategory == ""
  ) {
    return false;
  } else return true;
};
export default validate;
