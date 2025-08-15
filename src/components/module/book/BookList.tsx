import { FaRegEdit } from "react-icons/fa";
import { BiSolidBookAdd } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/baseApi";
import type { Ibooks } from "@/types";
import { Link } from "react-router";
import DeleteBookModal from "./DeleteBookModal";
import Loader from "@/components/Loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const BookList = () => {
  const {
    data: allBookData,
    isLoading: allBookLoading,
    isError: allBookError,
  } = useGetAllBooksQuery(undefined);

  const [deleteBook, { isLoading: deleteLoading, isError: deleteError }] =
    useDeleteBookMutation(undefined);

  if (allBookError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to Load Book List.</AlertTitle>
          <AlertDescription>
            <p>Please try again.</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (deleteError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Unable to delete book.</AlertTitle>
          <AlertDescription>
            <p>Please try again.</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (allBookLoading || deleteLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  const deleteBookHandler = (bookId: string) => {
    deleteBook(bookId);
    toast.warn("Book Details Removed Successfully!");
  };

  return (
    <div className="py-10 px-4 md:px-8">
      <h1 className="text-3xl text-center font-bold text-amber-900 mb-8">
        All Books At A Glance
      </h1>

      <div className="overflow-x-auto shadow-lg">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-amber-200 sticky top-0 z-10 shadow-md">
            <TableRow>
              <TableHead className="font-bold text-lg">Title</TableHead>
              <TableHead className="font-bold text-lg">Author</TableHead>
              <TableHead className="font-bold text-lg">Genre</TableHead>
              <TableHead className="font-bold text-lg">ISBN</TableHead>
              <TableHead className="font-bold text-lg">Copies</TableHead>
              <TableHead className="font-bold text-lg">Availability</TableHead>
              <TableHead className="font-bold text-lg">Details</TableHead>
              <TableHead className="font-bold text-lg">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {allBookData.data.map((bookData: Ibooks) => (
              <TableRow
                key={bookData._id}
                className="hover:bg-amber-50 transition-colors duration-300"
              >
                <TableCell>{bookData.title}</TableCell>
                <TableCell>{bookData.author}</TableCell>
                <TableCell>{bookData.genre}</TableCell>
                <TableCell>{bookData.isbn}</TableCell>
                <TableCell>{bookData.copies}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-white font-medium text-sm ${
                      bookData.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {bookData.available ? "Available" : "Unavailable"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button className="bg-amber-300 text-amber-900 hover:bg-amber-500 hover:text-white transition">
                    <Link to={`/books/${bookData._id}`}>View</Link>
                  </Button>
                </TableCell>
                <TableCell className="flex gap-2 flex-wrap">
                  <Link to={`/edit-book/${bookData._id}`}>
                    <Button
                      variant="ghost"
                      className="bg-green-500 text-white hover:bg-green-600 transition"
                    >
                      <FaRegEdit />
                    </Button>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="bg-red-800 hover:bg-red-900 transition"
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </DialogTrigger>

                    <DeleteBookModal
                      deleteBookHandler={deleteBookHandler}
                      bookId={bookData._id}
                    />
                  </Dialog>

                  <Link to={`/borrow/${bookData._id}`}>
                    <Button
                      disabled={!bookData.available}
                      className={`${
                        bookData.available
                          ? "bg-amber-500 text-white hover:bg-amber-600"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      } transition`}
                    >
                      <BiSolidBookAdd />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookList;
