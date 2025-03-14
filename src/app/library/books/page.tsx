"use client";

import { books } from "@/data/data";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react"; // Import Suspense
import Modal from "@/components/base/modal";
import Image from "next/image";
import Button from "@/components/base/button";
import { useCartStore } from "@/store/useCartStore";
import BookUpload from "@/components/base/modal/book-upload";
import { useAuthStore } from "@/store/useAuthStore";
import PreLoader from "@/components/base/preloader";

// Wrap the BooksPage component in Suspense
export default function BooksPage() {
  return (
    <Suspense fallback={<PreLoader />}>
      <BooksPageContent />
    </Suspense>
  );
}

// Move the main logic to a separate component
function BooksPageContent() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("bookId");
  const [selectedBook, setSelectedBook] = useState<(typeof books)[0] | null>(
    null
  );
  const [isBookModalOpen, setIsBookModalOpen] = useState(false); // State for book details modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State for upload book modal

  const { addToCart } = useCartStore();
  const { user } = useAuthStore();

  // Open the book details modal if a bookId is present
  useEffect(() => {
    if (bookId) {
      const book = books.find((book) => book.id === parseInt(bookId));
      if (book) {
        setSelectedBook(book);
        setIsBookModalOpen(true);
      }
    }
  }, [bookId]);

  const openBookModal = (book: (typeof books)[0]) => {
    setSelectedBook(book);
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
    setSelectedBook(null);
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  // Handle borrowing a book
  const handleBorrow = () => {
    if (selectedBook) {
      addToCart(selectedBook.id);
      alert(`${selectedBook.title} has been added to your circulation!`);
      closeBookModal();
    }
  };

  return (
    <div className="books-section">
      <div className="container">
        {/* Book Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="flex bg-gray-300 dark:bg-black-light-hover items-center w-full h-60 p-3">
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  width={1000}
                  height={1000}
                  className="w-full h-52 object-contain"
                />
              </div>
              <div className="flex flex-col px-2.5 py-3.5 gap-1.5 bg-transparent dark:bg-black">
                <h4 className="font-semibold text-black dark:text-gray-300">
                  {book.title}
                </h4>
                <p className="text-black dark:text-gray-300">
                  {book.authors.join(", ")}
                </p>
                <div className="flex justify-end">
                  <Button text="View" onClick={() => openBookModal(book)} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Book Button (Hidden for Readers) */}
        {user?.role !== "Reader" && (
          <div className="w-full flex justify-end mt-6">
            <Button text="Upload a Book" onClick={openUploadModal} />
          </div>
        )}

        {/* Modal for Book Details */}
        <Modal isOpen={isBookModalOpen} onClose={closeBookModal}>
          {selectedBook && (
            <div className="w-full absolute top-0 flex flex-col overflow-hidden rounded-lg">
              <Image
                src={selectedBook.coverImage}
                alt={selectedBook.title}
                width={1500}
                height={1500}
                className="w-full h-1/2"
              />
              <div className="p-6 flex flex-col gap-2">
                <h2 className="font-bold dark:text-white">
                  {selectedBook.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Authors:</strong> {selectedBook.authors.join(", ")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>ISBN:</strong> {selectedBook.ISBN}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Published Date:</strong> {selectedBook.publishedDate}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Publisher:</strong> {selectedBook.publisher}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Genre:</strong> {selectedBook.genre}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Date Added:</strong> {selectedBook.dateAdded}
                </p>
                <Button text="Borrow" onClick={handleBorrow} />
              </div>
            </div>
          )}
        </Modal>

        {/* Modal for Uploading a Book */}
        <Modal isOpen={isUploadModalOpen} onClose={closeUploadModal}>
          <BookUpload onClose={closeUploadModal} />
        </Modal>
      </div>
    </div>
  );
}
