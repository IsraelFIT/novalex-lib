"use client";

import Button from "@/components/base/button";
import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";

export default function Circulation() {
  const { borrowedBooks, removeFromCart } = useCartStore();

  return (
    <div className="cart-section">
      <div className="container">
        <h1 className="text-2xl font-bold dark:text-white">Borrowed Books</h1>
        {borrowedBooks.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              You haven&apos;t borrowed any books recently.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {borrowedBooks.map((book) => (
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
                    {(book.authors || []).join(", ")}
                  </p>
                  <Button
                    text="Remove"
                    onClick={() => removeFromCart(book.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
