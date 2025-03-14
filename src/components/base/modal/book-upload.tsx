"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/base/button";
import Input from "@/components/base/inputs";
import { MdOutlineFileUpload } from "react-icons/md";

interface BookUploadProps {
  onClose: () => void;
}

export default function BookUpload({ onClose }: BookUploadProps) {
  // State for book details
  const [coverImage, setCoverImage] = useState("/dashboard-assets/book-2.jpg");
  const [title, setTitle] = useState("");
  const [ISBN, setISBN] = useState("");
  const [revisionNumber, setRevisionNumber] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [publisher, setPublisher] = useState("");
  const [authors, setAuthors] = useState<string[]>([]);
  const [dateAdded, setDateAdded] = useState("");
  const [genre, setGenre] = useState("");

  // Handle file upload for cover image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding authors
  const handleAddAuthor = () => {
    setAuthors([...authors, ""]);
  };

  // Handle author input change
  const handleAuthorChange = (index: number, value: string) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };

  // Handle form submission
  const handleSubmit = () => {
    const newBook = {
      coverImage,
      title,
      ISBN,
      revisionNumber: parseInt(revisionNumber, 10),
      publishedDate,
      publisher,
      authors: authors.filter((author) => author.trim() !== ""),
      dateAdded,
      genre,
    };
    console.log("New Book:", newBook);

    onClose();
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-5 rounded-2xl">
        <h2 className="font-semibold text-black dark:text-gray-300">
          Upload a New Book
        </h2>
        <div className="w-full flex flex-col gap-5">
          {/* Cover Image Upload */}
          <p className="text-black dark:text-gray-300">Cover Image</p>
          <div className="flex items-center gap-5">
            <Image
              src={coverImage}
              alt="Book Cover"
              width={300}
              height={300}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex gap-4">
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="coverImage">
                <Button text="Upload Image" icon={<MdOutlineFileUpload />} />
              </label>
              <Button
                text="Remove"
                classname="transparent-button"
                onClick={() =>
                  setCoverImage("/dashboard-assets/default-book-cover.jpg")
                }
              />
            </div>
          </div>

          {/* Title Input */}
          <Input
            type="text"
            name="title"
            label="Title"
            placeholder="Enter the book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            description="The title of the book"
          />

          {/* ISBN Input */}
          <Input
            type="text"
            name="ISBN"
            label="ISBN"
            placeholder="Enter the ISBN"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            description="The International Standard Book Number"
          />

          {/* Revision Number Input */}
          <Input
            type="number"
            name="revisionNumber"
            label="Revision Number"
            placeholder="Enter the revision number"
            value={revisionNumber}
            onChange={(e) => setRevisionNumber(e.target.value)}
            description="The revision number of the book"
          />

          {/* Published Date Input */}
          <Input
            type="date"
            name="publishedDate"
            label="Published Date"
            placeholder="Enter the published date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            description="The date the book was published"
          />

          {/* Publisher Input */}
          <Input
            type="text"
            name="publisher"
            label="Publisher"
            placeholder="Enter the publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            description="The publisher of the book"
          />

          {/* Authors Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black dark:text-gray-300">
              Authors
            </label>
            {authors.map((author, index) => (
              <Input
                key={index}
                type="text"
                name={`author-${index}`}
                placeholder="Enter an author's name"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                description={index === 0 ? "The authors of the book" : ""}
              />
            ))}
            <Button
              text="Add Author"
              classname="transparent-button"
              onClick={handleAddAuthor}
            />
          </div>

          {/* Date Added Input */}
          <Input
            type="date"
            name="dateAdded"
            label="Date Added"
            placeholder="Enter the date added"
            value={dateAdded}
            onChange={(e) => setDateAdded(e.target.value)}
            description="The date the book was added to the library"
          />

          {/* Genre Input */}
          <Input
            type="text"
            name="genre"
            label="Genre"
            placeholder="Enter the genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            description="The genre of the book"
          />

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <Button text="Upload Book" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
