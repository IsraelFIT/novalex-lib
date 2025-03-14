"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/base/table";
import Image from "next/image";
import { useState } from "react";
import Modal from "@/components/base/modal";
import users from "@/data/users";
import { calculateDaysRemaining, getBorrowedBooks } from "@/utils/helper";

interface Book {
  id: number;
  coverImage: string;
  title: string;
  ISBN: string;
  checkedOutDate?: string;
  expectedCheckInDate?: string;
  checkedIn?: boolean;
}

// interface UserBooks {
//   borrowed: Book | Book[];
//   returned: Book | Book[];
// }

export default function Users() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user: (typeof users)[0]) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="overflow-hidden p-6">
      <div className="max-w-full overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Reader&apos;s Full Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone Number
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Book Borrowed
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Checked-Out Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Expected Check-In Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Days Remaining/Overdue
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {users.map((user: (typeof users)[0]) => {
                const borrowedBooks = getBorrowedBooks(user.books);

                return (
                  <TableRow
                    key={user.id}
                    onClick={() => openModal(user)} // Open modal on row click
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-full">
                          <Image
                            width={40}
                            height={40}
                            src={
                              user.image || "/dashboard-assets/user-image.png"
                            }
                            alt={user.firstName}
                            className="object-top"
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrowedBooks.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {borrowedBooks.map((book: Book) => (
                            <li key={book.id}>{book.title}</li>
                          ))}
                        </ul>
                      ) : (
                        "No books borrowed"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrowedBooks.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {borrowedBooks.map((book: Book) => (
                            <li key={book.id}>
                              {book.checkedOutDate || "N/A"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrowedBooks.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {borrowedBooks.map((book: Book) => (
                            <li key={book.id}>
                              {book.expectedCheckInDate || "N/A"}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {borrowedBooks.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {borrowedBooks.map((book: Book) => {
                            const daysRemaining = book.expectedCheckInDate
                              ? calculateDaysRemaining(book.expectedCheckInDate)
                              : 0;
                            return (
                              <li key={book.id}>
                                {book.checkedIn
                                  ? "Returned"
                                  : daysRemaining >= 0
                                  ? `${daysRemaining} days remaining`
                                  : `${Math.abs(daysRemaining)} days overdue`}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for User Details */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedUser && (
          <div className="w-full p-6">
            <h2 className="text-2xl font-bold dark:text-white">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <div className="mt-4 space-y-4">
              <Image
                width={400}
                height={400}
                src={selectedUser.image || "/dashboard-assets/user-image.png"}
                alt={selectedUser.firstName}
                className="object-top w-30 h-30 rounded-lg"
              />
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Role:</strong> {selectedUser.role}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-semibold dark:text-white">
                  Borrowed Books
                </h3>
                {getBorrowedBooks(selectedUser.books).length > 0 ? (
                  <ul className="list-disc list-inside">
                    {getBorrowedBooks(selectedUser.books).map((book: Book) => {
                      const daysRemaining = book.expectedCheckInDate
                        ? calculateDaysRemaining(book.expectedCheckInDate)
                        : 0;
                      return (
                        <li key={book.id} className="mt-4">
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Title:</strong> {book.title}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Checked-Out Date:</strong>{" "}
                            {book.checkedOutDate || "N/A"}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Expected Check-In Date:</strong>{" "}
                            {book.expectedCheckInDate || "N/A"}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            <strong>Status:</strong>{" "}
                            {book.checkedIn
                              ? "Returned"
                              : daysRemaining >= 0
                              ? `${daysRemaining} days remaining`
                              : `${Math.abs(daysRemaining)} days overdue`}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    No books borrowed.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
