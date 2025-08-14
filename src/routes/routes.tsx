import AddBookForm from "@/components/module/book/AddBookForm";
// import AddBookModal from "@/components/module/book/AddBookModal";
import BookList from "@/components/module/book/BookList";
import UpdateBookForm from "@/components/module/book/UpdateBookForm";
import ViewBook from "@/components/module/book/ViewBook";
import BorrowBook from "@/components/module/borrow/BorrowBook";
import BorrowBookList from "@/components/module/borrow/BorrowBookList";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
    children: [
      {
        index: true,
        Component: BookList,
      },
      {
        path: "books",
        Component: BookList,
      },
      {
        path: "create-book",
        Component: AddBookForm,
      },
      {
        path: "books/:bookId",
        Component: ViewBook,
      },
      {
        path: "edit-book/:bookId",
        Component: UpdateBookForm,
      },
      {
        path: "borrow-summary",
        Component: BorrowBookList,
      },
      {
        path: "borrow/:bookId",
        Component: BorrowBook,
      },
    ],
  },
]);
