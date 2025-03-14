"use client";

import Image from "next/image";
import { useState } from "react";
import { LuChevronsDownUp } from "react-icons/lu";
import { PiCaretUpDown } from "react-icons/pi";
import Button from "../button";
import { useRouter } from "next/navigation";
import "./style.css";
import { useAuthStore } from "@/store/useAuthStore";

export default function UserWidget() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    logout(); // Clear Zustand store
    router.push("/"); // Redirect to login page
  };

  return (
    <div className="w-full px-4 py-5 text-center border border-transparent border-t-gray-200 dark:border-t-black-light-hover">
      {/* User Profile Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <Image
            src={
              user
                ? user.image || "/dashboard-assets/user-image.png"
                : "/dashboard-assets/user-image.png"
            }
            alt="User Profile"
            width={300}
            height={300}
            className="w-10 h-10 rounded-full"
          />
          {/* User Details */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {user ? user.role : "Not Logged In"}
            </p>
          </div>
        </div>
        {/* Expand/Collapse Arrow */}
        <button
          onClick={toggleExpand}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {isExpanded ? <LuChevronsDownUp /> : <PiCaretUpDown />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="user-content">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user ? (
              <>
                {user.phone} | {user.country}
              </>
            ) : (
              "Please log in to access features."
            )}
          </p>

          {user && (
            <Button
              text="View Profile"
              page="/library/settings"
              classname="transparent-button"
            />
          )}

          {/* Logout Button */}
          <Button text="Logout" onClick={handleLogout} />
        </div>
      )}
    </div>
  );
}
