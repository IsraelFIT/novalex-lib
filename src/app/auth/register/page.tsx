"use client";

import Button from "@/components/base/button";
import Input from "@/components/base/inputs";
import users, { addUser } from "@/data/users";
import "@/styles/auth.css";
import Image from "next/image";
import { useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";

export default function Register() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countries = ["Nigeria", "Zambia", "Malaysia", "United States"];

  // Handle submit
  const handleSubmit = async () => {
    try {
      // Create a new user object
      const newUser = {
        id: users.length + 1,
        image: "/dashboard-assets/user-image-1.jpg",
        firstName: first,
        lastName: last,
        email,
        password,
        address,
        country,
        phone,
        role: "Reader",
        token: `mock-jwt-token-${Math.random().toString(36).substring(7)}`,
        books: {
          borrowed: [],
          returned: [],
        },
      };

      // Add the new user to the users array
      addUser(newUser);

      // Set the authentication token in a cookie
      document.cookie = `auth-token=${newUser.token}; path=/; max-age=${
        60 * 60
      }`; // Expires in 1 hour

      // Simulate a successful registration
      setIsModalOpen(true);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-section">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-image">
              <Image
                src="/auth-assets/user.png"
                className="block dark:hidden"
                alt="Password Icon"
                width={800}
                height={800}
              />
              <Image
                src="/auth-assets/user-dark.png"
                className="dark:block hidden"
                alt="Password Icon"
                width={800}
                height={800}
              />
            </div>
            <h1>Create a Library Account</h1>
            <h6>
              Carefully fill out all the details and we&apos;ll be in touch as
              soon as it has been reviewed.
            </h6>
          </div>

          <div className="auth-body">
            {/* First Name Input */}
            <Input
              type="text"
              name="first"
              label="First Name"
              placeholder="Enter your first name"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
              description="Please enter your first name"
            />

            {/* Last Name Input */}
            <Input
              type="text"
              name="last"
              label="Last Name"
              placeholder="Enter your last name"
              value={last}
              onChange={(e) => setLast(e.target.value)}
              description="Please enter your last name"
            />

            {/* Email Input */}
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              description="Please enter your email address"
            />

            {/* Address Input */}
            <Input
              type="text"
              name="address"
              label="Address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              description="Enter your address start with your street e.g No.5, Anambra crescent, Abuja."
            />

            {/* Country Input */}
            <Input
              type="select"
              name="country"
              label="Country"
              placeholder="Enter your country"
              value={country}
              options={countries}
              onChange={(e) => setCountry(e.target.value)}
              description="Please enter your country"
            />

            {/* Phone Number Input */}
            <Input
              type="tel"
              name="phone"
              label="Phone number"
              placeholder="+234"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              description="Please enter your phone number starting with the right country code"
            />

            {/* Password Input */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              description="Please enter your password"
            />
          </div>

          <div className="register-body">
            {/* Error Message */}
            {error && (
              <div className="error-message">
                <p>{error}</p>
              </div>
            )}
            <Button text="Submit" onClick={handleSubmit} />
            <Button
              text="Back to Login"
              classname="transparent-button"
              page="/"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-circle">
                <IoCheckmarkOutline />
              </div>
              <h1>Submitted Successfully</h1>
              <h6>Your request has been submitted successfully</h6>
            </div>

            <Button text="Continue" onClick={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
