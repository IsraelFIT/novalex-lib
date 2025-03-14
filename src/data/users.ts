// Load users from localStorage or use the default users array
const loadUsers = () => {
  if (typeof window !== "undefined") {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : defaultUsers;
  }
  return defaultUsers;
};

// Define the User interface
interface User {
  id: number;
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  country: string;
  phone: string;
  role: string;
  token: string;
  books: {
    borrowed: {
      id: number;
      coverImage: string;
      title: string;
      ISBN: string;
      checkedOutDate: string;
      expectedCheckInDate: string;
      checkedIn: boolean;
    }[];
    returned: {
      id: number;
      coverImage: string;
      title: string;
      ISBN: string;
      returnedDate: string;
    }[];
  };
}

// Default users array
const defaultUsers: User[] = [
  {
    id: 1,
    image: "/dashboard-assets/user-image-2.jpg",
    firstName: "Tomi",
    lastName: "Amusan",
    email: "tomiamusan@gmail.com",
    password: "Pa$$w0rd!",
    address: "No. 5, Adazi Ani Street, Maitama, Abuja.",
    country: "Nigeria",
    phone: "+2348056789006",
    role: "Chief Librarian",
    token: "mock-jwt-token-123456",
    books: {
      borrowed: [],
      returned: [],
    },
  },
  {
    id: 2,
    image: "/dashboard-assets/user-image-3.jpg",
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gamil.com",
    password: "password456#",
    address: "45 Elm St, Osun Crescent, Wuse, Abuja.",
    country: "Nigeria",
    phone: "+2349076543215",
    role: "Assistant Librarian",
    token: "mock-jwt-token-654321",
    books: {
      borrowed: [
        {
          id: 7,
          coverImage: "/dashboard-assets/book-5.jpg",
          title: "Oppenheimer: The Father of the Atomic Bomb",
          ISBN: "978-0735211292",
          checkedOutDate: "2025-03-02",
          expectedCheckInDate: "2025-03-12",
          checkedIn: false,
        },
      ],
      returned: [
        {
          id: 6,
          coverImage: "/dashboard-assets/book-6.jpg",
          title: "Jack Sparrow: The Man, The Legend.",
          ISBN: "978-0747532699",
          returnedDate: "2025-03-12",
        },
      ],
    },
  },
  {
    id: 3,
    image: "/dashboard-assets/user-image-1.jpg",
    firstName: "Sarah",
    lastName: "Ngozi",
    email: "sarahngozi@example.com",
    password: "!Password#",
    address: "45 Nzumba, Mbadiwe Crescent, Wuse, Abuja.",
    country: "Nigeria",
    phone: "+2349076543215",
    role: "Reader",
    token: "mock-jwt-token-654321",
    books: {
      borrowed: [
        {
          id: 7,
          coverImage: "/dashboard-assets/book-5.jpg",
          title: "Oppenheimer: The Father of the Atomic Bomb",
          ISBN: "978-0735211292",
          checkedOutDate: "2025-03-03",
          expectedCheckInDate: "2025-03-13",
          checkedIn: false,
        },
        {
          id: 1,
          coverImage: "/dashboard-assets/book-1.jpg",
          title: "Harry Potter and the Sorcerer’s Stone",
          ISBN: "978-0747532699",
          checkedOutDate: "2025-03-01",
          expectedCheckInDate: "2025-03-10",
          checkedIn: true,
        },
        {
          id: 12,
          coverImage: "/dashboard-assets/book-5.jpg",
          title: "Atomic Habits",
          ISBN: "978-0735211292",
          checkedOutDate: "2025-04-05",
          expectedCheckInDate: "2025-04-15",
          checkedIn: false,
        },
      ],
      returned: [
        {
          id: 6,
          coverImage: "/dashboard-assets/book-6.jpg",
          title: "Jack Sparrow: The Man, The Legend.",
          ISBN: "978-0747532699",
          returnedDate: "2025-02-12",
        },
      ],
    },
  },
];

// Initialize users from localStorage or default users
const users = loadUsers();

// Add a new user and save to localStorage
export const addUser = (newUser: User) => {
  users.push(newUser);
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users));
  }
};

export default users;
