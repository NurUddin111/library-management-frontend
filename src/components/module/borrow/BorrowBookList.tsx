import Loader from "@/components/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBorrowedBooksQuery } from "@/redux/api/baseApi";
import type { IBorrow } from "@/types";
import { AlertCircleIcon } from "lucide-react";

const BorrowBookList = () => {
  const { isError, isLoading, data } = useGetAllBorrowedBooksQuery(undefined);

  if (isError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to load borrow summary!</AlertTitle>
          <AlertDescription>
            <p>Please try again later!</p>
          </AlertDescription>
        </Alert>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );

  const borrowBookData = data?.data || [];

  return (
    <div className="flex justify-center my-10 px-4 md:px-0">
      <div className="w-full max-w-4xl overflow-x-auto border border-gray-300 shadow-lg rounded-2xl bg-white p-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-amber-900 pb-4">
          Borrowed Books Summary
        </h1>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="bg-amber-100 text-center">
              <TableHead className="px-4 py-2">Title</TableHead>
              <TableHead className="px-4 py-2">ISBN</TableHead>
              <TableHead className="px-4 py-2">Total Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {borrowBookData.map((borrowRecord: IBorrow) => (
              <TableRow
                key={borrowRecord.book.isbn}
                className="hover:bg-amber-50 transition-colors"
              >
                <TableCell className="px-4 py-2 text-left">
                  {borrowRecord.book.title}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {borrowRecord.book.isbn}
                </TableCell>
                <TableCell className="px-4 py-2">
                  {borrowRecord.totalQuantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BorrowBookList;
