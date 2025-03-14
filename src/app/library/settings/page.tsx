"use client";

import Button from "@/components/base/button";
import Input from "@/components/base/inputs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  phone: string;
  image?: string;
  token: string;
}

export default function Profile() {
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("/dashboard-assets/user-image.png");

  const countries = ["Nigeria", "Zambia", "Malaysia", "United States"];

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const fetchUserData = () => {
      // Retrieve the users array from localStorage
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users: User[] = JSON.parse(storedUsers);

        // Retrieve the logged-in user's token from cookies
        const authToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("auth-token="))
          ?.split("=")[1];

        // Find the logged-in user by token
        const loggedInUser = users.find(
          (user: User) => user.token === authToken
        );

        if (loggedInUser) {
          // Populate the form fields with the user's data
          setFullName(`${loggedInUser.firstName} ${loggedInUser.lastName}`);
          setAddress(loggedInUser.address);
          setEmail(loggedInUser.email);
          setCountry(loggedInUser.country);
          setPhone(loggedInUser.phone);
          setAvatar(loggedInUser.image || "/dashboard-assets/user-image.png");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col max-w-lg gap-5 p-6 mb-16 rounded-2xl border border-gray-200 dark:border-gray-800">
        <h2 className="font-semibold text-black dark:text-gray-300">
          Profile Information
        </h2>
        <div className="w-full flex flex-col gap-5">
          <p className="text-black dark:text-gray-300">Profile Image</p>
          <div className="flex items-center gap-5">
            <Image
              src={avatar}
              alt="User Profile"
              width={300}
              height={300}
              className="w-16 h-16 rounded-full"
            />
            <div className="flex gap-4">
              <Button text="Upload Image" icon={<MdOutlineFileUpload />} />
              <Button text="Remove" classname="transparent-button" />
            </div>
          </div>
          {/* Display Name Input */}
          <Input
            type="text"
            name="fullname"
            label="Full Name"
            placeholder="Your Full Name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            description="Your full name"
          />

          {/* Email Input */}
          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            description="Your email"
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

          <div className="w-full flex justify-end">
            <Button text="Save" />
          </div>
        </div>
      </div>
    </div>
  );
}
