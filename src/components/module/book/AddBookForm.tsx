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
import { useCreateBookMutation } from "@/redux/api/baseApi";
import { AlertCircleIcon } from "lucide-react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddBookForm = () => {
  const form = useForm();
  const navigate = useNavigate();
  const [createBook, { isLoading, isError }] = useCreateBookMutation();

  if (isError)
    return (
      <div>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Failed to Add Book</AlertTitle>
          <AlertDescription>
            <p>Kindly fill up the form with proper details</p>
          </AlertDescription>
        </Alert>
      </div>
    );
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader />
      </div>
    );

  const onSubmit: SubmitHandler<FieldValues> = async (details) => {
    const isbnPattern = /^[0-9]{10,13}$/;
    if (!isbnPattern.test(details.isbn)) {
      toast.error("ISBN must be 10-13 digits only!");
      return;
    }
    const { genre } = details;
    if (!genre) {
      toast.error("Please select a Genre");
      return;
    }

    try {
      await createBook({ ...details }).unwrap();
      form.reset();
      toast.success("Book Added Successfully!");
      navigate("/books");
    } catch {
      toast.error("Failed to add book!");
    }
  };

  return (
    <div className="flex justify-center my-10 px-4 md:px-0">
      <div className="w-full max-w-3xl border border-gray-300 shadow-lg rounded-2xl p-8 bg-white">
        <h1 className="text-center text-2xl md:text-3xl font-bold text-amber-900 mb-6">
          Add New Book
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
                    <Input
                      {...field}
                      placeholder="Enter book title"
                      value={field.value || ""}
                      required
                      className="focus:ring-amber-300"
                    />
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
                      value={field.value || ""}
                      className="focus:ring-amber-300"
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
                    onValueChange={field.onChange}
                    value={field.value || ""}
                    required
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={"FICTION"}>
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
                      type="text"
                      value={field.value || ""}
                      className="focus:ring-amber-300"
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
                    <Textarea
                      {...field}
                      placeholder="Enter description"
                      value={field.value || ""}
                      className="focus:ring-amber-300"
                    />
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
                      placeholder="Number of copies"
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      required
                      value={field.value || ""}
                      className="focus:ring-amber-300"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="true/false"
                      readOnly
                      defaultValue="true"
                      className="bg-gray-100 cursor-not-allowed"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium transition-all"
            >
              Add Book
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddBookForm;
