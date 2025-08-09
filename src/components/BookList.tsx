import { FaRegEdit, FaHandHolding } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const BookList = () => {
  return (
    <div>
      <div className="py-5">
        <h1 className="text-3xl text-center">All Books At A Glance</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="">Author</TableHead>
            <TableHead className="">Genre</TableHead>
            <TableHead className="">ISBN</TableHead>
            <TableHead className="">Copies</TableHead>
            <TableHead className="">Availibility</TableHead>
            <TableHead className="">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell className="font-medium flex gap-2">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost">
                    <FaRegEdit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost">
                    <RiDeleteBin6Line />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="ghost">
                    <FaHandHolding />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Borrow</p>
                </TooltipContent>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BookList;
