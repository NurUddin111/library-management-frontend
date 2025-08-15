import Loader from "@/components/Loader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetBookByIDQuery,
  useUpdateBookMutation,
} from "@/redux/api/baseApi";
import { AlertCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateBookForm = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const {
    data: getData,
    isLoading: getLoading,
    isError: getError,
  } = useGetBookByIDQuery(bookId);

  const [updateBook, { isLoading: updateLoading, isError: updateError }] =
    useUpdateBookMutation();

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
    },
  });

  const bookData = getData?.data;

  useEffect(() => {
    if (bookData) {
      form.reset(bookData);
    }
  }, [bookData, form]);

  if (getLoading || updateLoading)
    return (
      <div className="flex justify-center mt-10">
        <Loader />
      </div>
    );
  if (getError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to load book details.</AlertTitle>
          <AlertDescription>
            <p>Please try again.</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (updateError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to update Book.</AlertTitle>
          <AlertDescription>
            <p>Please try again.</p>
          </AlertDescription>
        </Alert>
      </div>
    );

  const onSubmit: SubmitHandler<FieldValues> = async (details) => {
    const isbnPattern = /^[0-9]{10,13}$/;
    if (!isbnPattern.test(details.isbn)) {
      toast.error("ISBN must be 10-13 digits only!");
      return;
    }

    try {
      await updateBook({ bookId, bookDetails: details }).unwrap();
      toast.success("Book updated successfully!");
      navigate(`/books/${bookId}`);
    } catch {
      toast.error("Failed to update book!");
    }
  };

  return (
    <div className="flex justify-center my-10 px-4 md:px-0">
      <div className="w-full max-w-3xl border border-gray-300 shadow-lg rounded-2xl p-8 bg-white">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-amber-900 mb-6">
          Update Book Details
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter book title" required />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter author name"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    value={field.value || bookData.genre}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter ISBN (10-13 digits)"
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Enter description" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      required
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium transition-all"
            >
              Update Book
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateBookForm;
