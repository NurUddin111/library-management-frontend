export interface Ibooks {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export type DeleteBookModalProps = {
  deleteBookHandler: (bookId: string) => void;
  bookId: string;
};

export interface IBorrow {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
