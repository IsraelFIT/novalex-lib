import { create } from "zustand";
import { books } from "@/data/data"; // Import the books data
import users from "@/data/users"; // Import the users data and addUser function
import { useAuthStore } from "@/store/useAuthStore"; // Import the auth store to get the logged-in user

interface CartState {
  borrowedBooks: typeof books; // Array of borrowed books
  addToCart: (bookId: number) => void; // Function to add a book to the cart
  removeFromCart: (bookId: number) => void; // Function to remove a book from the cart
}

export const useCartStore = create<CartState>((set) => {
  // Get the logged-in user from the auth store
  const { user } = useAuthStore.getState();

  // Initialize borrowedBooks with the logged-in user's borrowed books
  const loggedInUser = users.find(
    (u: { token: string; books: { borrowed: typeof books } }) =>
      u.token === user?.token
  );
  const initialBorrowedBooks = loggedInUser?.books.borrowed || [];

  return {
    borrowedBooks: initialBorrowedBooks,

    // Add a book to the cart
    addToCart: (bookId) => {
      set((state) => {
        const bookToAdd = books.find((book) => book.id === bookId);
        if (
          bookToAdd &&
          !state.borrowedBooks.some((book) => book.id === bookId)
        ) {
          // Update the user's borrowed books in the users array
          const updatedUsers = users.map(
            (u: { token: string; books: { borrowed: typeof books } }) => {
              if (u.token === user?.token) {
                return {
                  ...u,
                  books: {
                    ...u.books,
                    borrowed: [...u.books.borrowed, bookToAdd],
                  },
                };
              }
              return u;
            }
          );

          // Save the updated users array to localStorage
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          // Update the cart state
          return { borrowedBooks: [...state.borrowedBooks, bookToAdd] };
        }
        return state;
      });
    },

    // Remove a book from the cart
    removeFromCart: (bookId) => {
      set((state) => {
        // Update the user's borrowed books in the users array
        const updatedUsers = users.map(
          (u: { token: string; books: { borrowed: typeof books } }) => {
            if (u.token === user?.token) {
              return {
                ...u,
                books: {
                  ...u.books,
                  borrowed: u.books.borrowed.filter(
                    (book) => book.id !== bookId
                  ),
                },
              };
            }
            return u;
          }
        );

        // Save the updated users array to localStorage
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Update the cart state
        return {
          borrowedBooks: state.borrowedBooks.filter(
            (book) => book.id !== bookId
          ),
        };
      });
    },
  };
});
