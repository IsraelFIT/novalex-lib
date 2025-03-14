// "use client";

// import { FiSearch } from "react-icons/fi";
// import { useState, useEffect, useRef } from "react";
// import { PiArrowsInLight, PiArrowsOutLight } from "react-icons/pi";
// import NotificationDropdown from "./notification";
// import { useSidebarStore } from "@/store/sidebarStore";
// import { books } from "@/data/data"; // Import the books data
// import Link from "next/link";
// import Image from "next/image";

// const Header: React.FC = () => {
//   const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
//   const [screenWidth, setScreenWidth] = useState<number>(0);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<typeof books>([]);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const {
//     isExpanded,
//     isMobileOpen,
//     toggleSidebar,
//     toggleMobileSidebar,
//     selectedPageName,
//   } = useSidebarStore();

//   const toggleNotificationMenu = () => {
//     setNotificationMenuOpen((prev) => !prev);
//   };

//   const handleToggle = () => {
//     if (window.innerWidth >= 991) {
//       toggleSidebar();
//     } else {
//       toggleMobileSidebar();
//     }
//   };

//   // Handle search query changes
//   useEffect(() => {
//     if (searchQuery) {
//       const filteredBooks = books.filter(
//         (book) =>
//           book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           book.ISBN.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           book.dateAdded.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setSearchResults(filteredBooks);
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchQuery]);

//   useEffect(() => {
//     // Set the initial screen width
//     setScreenWidth(window.innerWidth);

//     // Update screen width on resize
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     // Cleanup the event listener
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === "k") {
//         event.preventDefault();
//         inputRef.current?.focus();
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   return (
//     <header className="sticky top-0 h-fit lg:h-20 flex w-full bg-white border-gray-200 z-[999] dark:border-black-light-hover dark:bg-black-light lg:border-b">
//       <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
//         <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:border-b-0 lg:px-0 lg:py-4">
//           <div className="sidebar-logo flex gap-2 items-center">
//             {/* Toggle Sidebar Button */}
//             {(isMobileOpen || !isExpanded || screenWidth <= 770) && (
//               <button
//                 className="items-center justify-center w-10 h-10 text-black-light z-9999 lg:flex dark:text-gray-400 lg:h-11 lg:w-11"
//                 onClick={handleToggle}
//                 aria-label="Toggle Sidebar"
//               >
//                 {isMobileOpen ? (
//                   <PiArrowsInLight className="text-lg lg:text-2xl stroke-2" />
//                 ) : (
//                   <PiArrowsOutLight className="text-lg lg:text-2xl stroke-2" />
//                 )}
//               </button>
//             )}

//             {/* Page Name */}
//             <div className="header-title">
//               <h3 className="text-black-light dark:text-gray-400">
//                 {selectedPageName}
//               </h3>
//             </div>
//           </div>

//           <div className="header-right flex gap-5">
//             {/* Search Bar */}
//             <div className="hidden lg:block relative">
//               <div className="relative">
//                 <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
//                   <FiSearch
//                     className="text-black-light dark:text-gray-400"
//                     size={20}
//                   />
//                 </span>
//                 <input
//                   ref={inputRef}
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="h-11 w-full rounded-lg border border-gray-200 bg-gray-300/60 py-2.5 pl-12 pr-14 text-sm text-gray-800 placeholder:text-gray-700 focus:border-blue-normal focus:outline-hidden focus:ring-1 focus:ring-blue-500/10 dark:border-black-light dark:bg-black dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-black-light-hover xl:w-[430px]"
//                 />
//                 <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 justify-center items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-300/60 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400">
//                   <span> ⌘ </span>
//                   <span> K </span>
//                 </button>
//               </div>

//               {/* Search Results */}
//               {searchQuery && (
//                 <div className="absolute top-14 left-0 w-full bg-white dark:bg-black-light rounded-lg shadow-lg z-[999999]">
//                   <div className="grid grid-cols-1 gap-4 p-4 max-h-96 overflow-y-auto">
//                     {searchResults.length > 0 ? (
//                       searchResults.map((book) => (
//                         <Link
//                           key={book.id}
//                           href={`/library/books/${book.id}`}
//                           className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg no-underline"
//                         >
//                           <Image
//                             src={book.coverImage}
//                             alt={book.title}
//                             width={50}
//                             height={50}
//                             className="w-12 h-12 object-cover rounded-lg"
//                           />
//                           <div>
//                             <h4 className="text-sm font-semibold text-black-light dark:text-white">
//                               {book.title}
//                             </h4>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">
//                               {book.authors.join(", ")}
//                             </p>
//                           </div>
//                         </Link>
//                       ))
//                     ) : (
//                       <p className="text-sm text-gray-500 dark:text-gray-400">
//                         No results found.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Notification Menu */}
//             <div className="flex items-center justify-between w-fit gap-4 lg:flex lg:justify-end lg:px-0 lg:shadow-none">
//               <div className="flex items-center gap-3">
//                 {/* Notification Dropdown */}
//                 <NotificationDropdown
//                   isOpen={isNotificationMenuOpen}
//                   toggleDropdown={toggleNotificationMenu}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import { FiSearch } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { PiArrowsInLight, PiArrowsOutLight } from "react-icons/pi";
import NotificationDropdown from "./notification";
import { useSidebarStore } from "@/store/sidebarStore";
import { books } from "@/data/data";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isNotificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<typeof books>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Use the router for navigation

  const {
    isExpanded,
    isMobileOpen,
    toggleSidebar,
    toggleMobileSidebar,
    selectedPageName,
  } = useSidebarStore();

  const toggleNotificationMenu = () => {
    setNotificationMenuOpen((prev) => !prev);
  };

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  // Handle search query changes
  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.ISBN.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.dateAdded.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredBooks);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Set the initial screen width
    setScreenWidth(window.innerWidth);

    // Update screen width on resize
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle book click in search results
  const handleBookClick = (bookId: number) => {
    router.push(`/library/books?bookId=${bookId}`); // Navigate with query parameter
  };

  return (
    <header className="sticky top-0 h-fit lg:h-20 flex w-full bg-white border-gray-200 z-[999] dark:border-black-light-hover dark:bg-black-light lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:border-b-0 lg:px-0 lg:py-4">
          <div className="sidebar-logo flex gap-2 items-center">
            {/* Toggle Sidebar Button */}
            {(isMobileOpen || !isExpanded || screenWidth <= 770) && (
              <button
                className="items-center justify-center w-10 h-10 text-black-light z-9999 lg:flex dark:text-gray-400 lg:h-11 lg:w-11"
                onClick={handleToggle}
                aria-label="Toggle Sidebar"
              >
                {isMobileOpen ? (
                  <PiArrowsInLight className="text-lg lg:text-2xl stroke-2" />
                ) : (
                  <PiArrowsOutLight className="text-lg lg:text-2xl stroke-2" />
                )}
              </button>
            )}

            {/* Page Name */}
            <div className="header-title">
              <h3 className="text-black-light dark:text-gray-400">
                {selectedPageName}
              </h3>
            </div>
          </div>

          <div className="header-right flex gap-5">
            {/* Search Bar */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                  <FiSearch
                    className="text-black-light dark:text-gray-400"
                    size={20}
                  />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 w-full rounded-lg border border-gray-200 bg-gray-300/60 py-2.5 pl-12 pr-14 text-sm text-gray-800 placeholder:text-gray-700 focus:border-blue-normal focus:outline-hidden focus:ring-1 focus:ring-blue-500/10 dark:border-black-light dark:bg-black dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-black-light-hover xl:w-[430px]"
                />
                <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 justify-center items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-300/60 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400">
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="absolute top-14 left-0 w-full bg-white dark:bg-black-light rounded-lg shadow-lg z-[999999]">
                  <div className="grid grid-cols-1 gap-4 p-4 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((book) => (
                        <div
                          key={book.id}
                          onClick={() => handleBookClick(book.id)} // Navigate on click
                          className="flex items-center gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                        >
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            width={50}
                            height={50}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="text-sm font-semibold text-black-light dark:text-white">
                              {book.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {book.authors.join(", ")}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No results found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Menu */}
            <div className="flex items-center justify-between w-fit gap-4 lg:flex lg:justify-end lg:px-0 lg:shadow-none">
              <div className="flex items-center gap-3">
                {/* Notification Dropdown */}
                <NotificationDropdown
                  isOpen={isNotificationMenuOpen}
                  toggleDropdown={toggleNotificationMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
