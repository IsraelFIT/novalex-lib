"use client";

import { books } from "@/data/data";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "@/components/base/button";

export default function Library() {
  const { user } = useAuthStore();

  // Calculate statistics
  const totalBooks = books.length;
  const borrowedBooks = books.filter((book) => book.checkedOut).length;
  const returnedBooks = books.filter((book) => !book.checkedOut).length;
  const damagedBooks = books.filter(
    (book) => (book.checkedOutBy?.daysRemaining ?? 0) < 0
  ).length;

  return (
    <div className="library-section">
      <div className="container">
        {/* Welcome Message for Readers */}
        {user?.role === "Reader" ? (
          <div className="welcome-message">
            <h1>
              Welcome to NovaLex Library, <span>{user.firstName}!</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Click <kbd className="kbd">Cmd or Ctrl + K</kbd> to search or
              click the button below to explore books.
            </p>
            <div className="mt-4">
              <Button text="Explore Books" page="/library/books" />
            </div>
          </div>
        ) : (
          // Statistics Section for Non-Readers
          <div className="library-info">
            {[
              { title: "Total Books", value: totalBooks },
              { title: "Borrowed Books", value: borrowedBooks },
              { title: "Returned Books", value: returnedBooks },
              { title: "Damaged Books", value: damagedBooks },
            ].map((stat, index) => (
              <div key={index} className="dash-boxes">
                <div className="dash-title">
                  <h4>{stat.title}</h4>
                  <h1>{stat.value}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
