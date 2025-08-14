import {
  useDeleteBookMutation,
  useGetBookByIDQuery,
} from "@/redux/api/baseApi";
import { Link, useNavigate, useParams } from "react-router";
import { FaSnowman } from "react-icons/fa";
import { TbVersionsFilled } from "react-icons/tb";
import { PiListNumbersFill } from "react-icons/pi";
import { MdOutlineConfirmationNumber, MdEventAvailable } from "react-icons/md";
import { Button } from "@/components/ui/button";
import DeleteBookModal from "./DeleteBookModal";
import Loader from "@/components/Loader";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

const ViewBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const {
    data,
    isLoading: viewLoading,
    isError: viewError,
  } = useGetBookByIDQuery(bookId);

  const [deleteBook, { isError: deleteError, isLoading: deleteLoading }] =
    useDeleteBookMutation(undefined);

  if (viewError || deleteError)
    return (
      <div className="px-4">
        <Alert variant="destructive" className="max-w-lg mx-auto mt-10">
          <AlertCircleIcon className="h-5 w-5" />
          <AlertTitle>Unable to Load Book Details</AlertTitle>
          <AlertDescription>
            <p>
              Something went wrong while fetching the book. Please try again.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );

  if (viewLoading || deleteLoading)
    return (
      <div className="flex justify-center mt-20">
        <Loader />
      </div>
    );

  const bookData = data.data;

  const deleteBookHandler = (bookId: string) => {
    deleteBook(bookId);
    toast.warn("Book Details Removed Successfully!");
    navigate("/books");
  };

  return (
    <div className="my-10 px-4 flex justify-center">
      <div className="flex flex-col md:flex-row gap-8 border border-gray-300 shadow-md shadow-black/40 rounded-2xl p-5 w-full max-w-5xl bg-white">
        {/* Image Section */}
        <div className="flex justify-center flex-shrink-0">
          <img
            src="https://i.ibb.co.com/PvYZmvNd/mikolaj-DCzpr09c-TXY-unsplash.jpg"
            alt={bookData.title}
            className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl object-cover"
          />
        </div>

        {/* Book Info Section */}
        <div className="flex-1 w-full space-y-4">
          <h1 className="text-center md:text-left text-2xl font-bold underline">
            {bookData.title}
          </h1>

          <div className="flex gap-4 items-center">
            <FaSnowman size={20} />
            <p className="text-lg">Author: {bookData.author}</p>
          </div>

          <div className="flex gap-4 items-center">
            <TbVersionsFilled size={20} />
            <p className="text-lg">Genre: {bookData.genre}</p>
          </div>

          <div className="flex gap-4 items-center">
            <MdOutlineConfirmationNumber size={20} />
            <p className="text-lg">ISBN: {bookData.isbn}</p>
          </div>

          <div className="flex gap-4 items-center">
            <PiListNumbersFill size={20} />
            <p className="text-lg">Copies: {bookData.copies}</p>
          </div>

          <div className="flex gap-4 items-center">
            <MdEventAvailable size={20} />
            <p className="text-lg">
              Availability:{" "}
              <span
                className={`font-semibold ${
                  bookData.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {bookData.available ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <Link to={`/edit-book/${bookData._id}`}>
              <Button className="w-full bg-green-500 text-white hover:bg-green-600">
                Edit
              </Button>
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full bg-red-800 hover:bg-red-900"
                >
                  Delete
                </Button>
              </DialogTrigger>
              <DeleteBookModal
                deleteBookHandler={deleteBookHandler}
                bookId={bookData._id}
              />
            </Dialog>
          </div>

          {/* Borrow Button */}
          <div>
            {!bookData.available ? (
              <Button className="w-full" disabled>
                Borrow
              </Button>
            ) : (
              <Link to={`/borrow/${bookData._id}`}>
                <Button className="w-full">Borrow</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
