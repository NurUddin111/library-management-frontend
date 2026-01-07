import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-backend-brown.vercel.app",
  }),
  tagTypes: ["Books", "Borrow"],
  endpoints: (build) => ({
    getAllBooks: build.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    getBookByID: build.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["Books"],
    }),
    createBook: build.mutation({
      query: (bookDetails) => ({
        url: "/create-book",
        method: "POST",
        body: bookDetails,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: build.mutation({
      query: ({ bookId, bookDetails }) => ({
        url: `/edit-book/${bookId}`,
        method: "PUT",
        body: bookDetails,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: build.mutation({
      query: (bookId) => ({
        url: `/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    getAllBorrowedBooks: build.query({
      query: () => "/borrow-summary",
      providesTags: ["Borrow"],
    }),
    borrowBook: build.mutation({
      query: ({ bookId, borrowBookDetails }) => ({
        url: `borrow/${bookId}`,
        method: "POST",
        body: borrowBookDetails,
      }),
      invalidatesTags: ["Borrow", "Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIDQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetAllBorrowedBooksQuery,
} = baseApi;
