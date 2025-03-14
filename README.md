# SWG x NovaLex Library Management System

This is a **NovaLex Library Management System** built with **Next.js** as part of the interview task for the **Frontend Developer** role. The application allows users to browse books, borrow books, and manage their library account. It also includes role-based access control, where certain features (e.g., uploading books) are restricted to specific user roles.

---

## Features

1. **User Authentication**:
   - Users can log in with their email and password.
   - Role-based access control:
     - **Reader**: Can view and borrow books.
     - **Assistant Librarian**: Can view, borrow, and manage books.
     - **Chief Librarian**: Full access to all features, including uploading books.

2. **Book Management**:
   - View a list of available books.
   - View detailed information about a book (title, authors, ISBN, etc.).
   - Borrow books (add to circulation).

3. **Role-Based Access**:
   - **Readers** cannot upload books or access certain admin features.
   - **Assistant Librarians** and **Chief Librarians** can upload books and manage the library.

4. **Responsive Design**:
   - The application is fully responsive and works on all screen sizes.

5. **State Management**:
   - Uses **Zustand** for global state management (e.g., cart, authentication).

6. **Dynamic Routing**:
   - Uses Next.js dynamic routing for book details and modals.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/IsraelFIT/novalex-lib.git
   ```

2. Navigate to the project directory:
   ```bash
   cd swg-library-mgt
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Login Credentials

For testing purposes, the following users are hardcoded in the system:

| Name            | Email                     | Password     | Role               |
|-----------------|---------------------------|--------------|--------------------|
| Tomi Amusan     | tomiamusan@gmail.com      | Pa$$w0rd!    | Chief Librarian    |
| John Smith      | johnsmith@gamil.com       | password456# | Assistant Librarian|
| Sarah Ngozi     | sarahngozi@example.com    | !Password#   | Reader             |

---

## Key Files and Structure

- **`app/page.tsx`**: The main page of the application.
- **`app/library/books/page.tsx`**: The books page where users can browse and borrow books.
- **`components/base/modal/book-upload.tsx`**: The modal for uploading new books.
- **`store/useAuthStore.ts`**: Zustand store for managing authentication state.
- **`store/useCartStore.ts`**: Zustand store for managing borrowed books.
- **`data/data.ts`**: Contains the list of books and their details.
- **`data/users.ts`**: Contains the list of users and their credentials.

---

## How to Use

### 1. Logging In
- Navigate to the login page (if implemented) or use the hardcoded credentials above to simulate a login.

### 2. Browsing Books
- On the **Books** page, you can view all available books.
- Click the **View** button to see detailed information about a book.

### 3. Borrowing Books
- Click the **Borrow** button in the book details modal to add the book to your circulation.

### 4. Uploading Books (Admin Only)
- If you are logged in as an **Assistant Librarian** or **Chief Librarian**, you will see an **Upload a Book** button.
- Click the button to open the upload modal and fill in the book details.

---

## Technologies Used

- **Next.js**: Framework for building the application.
- **React**: Library for building user interfaces.
- **Zustand**: State management library.
- **Tailwind CSS**: Styling and responsive design.
- **Next.js App Router**: For routing and navigation.
- **TypeScript**: For type safety and better developer experience.

---

## Deployment

The application is deployed on **Vercel**.

## Acknowledgments

- **Next.js Team** for the amazing framework.
- **Zustand** for simple and effective state management.
- **Tailwind CSS** for making styling a breeze.

---

## Contact

For questions or feedback, feel free to reach out:

- **Name**: Israel Folaranmi
- **Email**: israelfolaranmi01@gmail.com
- **GitHub**: IsraelFIT

Thank you.
