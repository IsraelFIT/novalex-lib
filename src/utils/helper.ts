// Define the Book interface
interface Book {
  id: number;
  coverImage: string;
  title: string;
  ISBN: string;
  checkedOutDate: string;
  expectedCheckInDate: string;
  checkedIn: boolean;
}

// Define the Books interface
interface Books {
  borrowed: Book[] | Book;
}

// Function to calculate days remaining until the expected check-in date
export function calculateDaysRemaining(expectedCheckInDate: string): number {
  const today = new Date();
  const checkInDate = new Date(expectedCheckInDate);
  const timeDifference = checkInDate.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

// Function to get borrowed books
export function getBorrowedBooks(books: Books): Book[] {
  if (!books?.borrowed) return [];
  return Array.isArray(books.borrowed) ? books.borrowed : [books.borrowed];
}
