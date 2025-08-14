import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { format } from "date-fns";
import { AlertCircleIcon, CalendarIcon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const BorrowBook = () => {
  const form = useForm();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [borrowBook, { isError, isLoading }] = useBorrowBookMutation();

  if (isError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to borrow book.</AlertTitle>
          <AlertDescription>
            <p>Not enough copies available.Kindly reduce your quantity.</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (isLoading) return <Loader />;

  const onSubmit: SubmitHandler<FieldValues> = async (details) => {
    const borrowBookDetails = { ...details };
    const { dueDate } = details;
    if (!dueDate) {
      toast.error("Please select returning date");
      return;
    }
    await borrowBook({ bookId, borrowBookDetails }).unwrap();
    form.reset();
    navigate(`/borrow-summary`);
    toast.success("Book borrowed successfully!");
  };

  return (
    <div className="flex justify-center my-10 px-4">
      <div className="w-full max-w-md border border-gray-300 shadow-md shadow-amber-400 rounded-2xl p-8 bg-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Borrow a Book
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Book ID */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book ID</FormLabel>
                  <FormControl>
                    <Input {...field} defaultValue={bookId} readOnly />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      placeholder="Enter quantity"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-left pl-3 font-normal",
                            !field.value && "text-gray-400"
                          )}
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Select a due date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-2 w-auto">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Borrow Book
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BorrowBook;
