"use client";

import Button from "@/components/base/button";
import { useState } from "react";
import { BiNotification } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { TbNotification } from "react-icons/tb";

interface NotificationDropdownProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

export default function NotificationDropdown({
  isOpen,
  toggleDropdown,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Book Submission: Hunger Games",
      message:
        "Aisha has submitted 'The Hunger Games' for review. Please verify and approve the submission.",
      time: "13 minutes ago",
      date: "Today",
      unread: true,
    },
    {
      id: 2,
      title: "Overdue Book Alert: John Doe",
      message:
        "John Doe has an overdue book 'To Kill a Mockingbird' that needs follow-up.",
      time: "30 minutes ago",
      date: "Today",
      unread: true,
    },
    {
      id: 3,
      title: "New Membership Request",
      message:
        "A new user, Emily Carter, has applied for library membership. Please review the application.",
      time: "11:15 AM",
      date: "15th April 2024",
      unread: false,
    },
    {
      id: 4,
      title: "Book Reservation Request",
      message:
        "A user has requested to reserve '1984' by George Orwell. Please check availability.",
      time: "1 hour ago",
      date: "Today",
      unread: true,
    },
    {
      id: 5,
      title: "System Update Scheduled",
      message:
        "The library system will undergo maintenance on April 20th from 2:00 AM to 4:00 AM.",
      time: "Yesterday",
      date: "14th April 2024",
      unread: false,
    },
    {
      id: 6,
      title: "New Research Material Submission",
      message:
        "A new research document on 'Artificial Intelligence in Literature' has been submitted for review.",
      time: "04:29 PM",
      date: "15th April 2024",
      unread: false,
    },
    {
      id: 7,
      title: "User Request: Extended Borrowing Period",
      message:
        "Michael Smith has requested an extension for the book 'The Great Gatsby'. Please review the request.",
      time: "3 hours ago",
      date: "Today",
      unread: true,
    },
    {
      id: 8,
      title: "Damaged Book Reported",
      message:
        "A user reported that 'Pride and Prejudice' has a torn cover. Please inspect and take necessary action.",
      time: "Yesterday",
      date: "14th April 2024",
      unread: false,
    },
  ]);

  const [filter, setFilter] = useState("unread");

  function markAsRead(id: number) {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  }

  function markAllAsRead() {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false }))
    );
  }

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((notif) => notif.unread)
      : notifications;

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    const date = notif.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(notif);
    return acc;
  }, {} as Record<string, typeof filteredNotifications>);

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button className="notification-bell" onClick={toggleDropdown}>
        {notifications.some((notif) => notif.unread) && !isOpen && (
          <div className="pulse">
            <span className={!isOpen ? "animate-pulse" : ""}></span>
          </div>
        )}
        <FaRegBell className="text-lg lg:text-xl cursor-pointer" />
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <div className="notify-icon">
              <div className="notice-icon">
                <BiNotification className="text-black-light-hover dark:text-gray-normal-active text-2xl" />
              </div>
              <h4>Notification</h4>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 text-lg"
              onClick={toggleDropdown}
            >
              <FiX className="stroke-2" />
            </button>
          </div>

          {/* Tabs */}
          <div className="notification-tabs">
            <button
              className={`${filter === "all" ? "active" : "inactive"}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`${filter === "unread" ? "active" : "inactive"}`}
              onClick={() => setFilter("unread")}
            >
              Unread ({notifications.filter((n) => n.unread).length})
            </button>
          </div>

          {/* Notification List */}
          <div className="notification-list">
            {Object.entries(groupedNotifications).map(([date, notifs]) => (
              <div key={date}>
                {/* Date Line */}
                <div className="date-line">{date}</div>
                {/* Notifications for this date */}
                {notifs.map((notif) => (
                  <div key={notif.id} className="notification-item">
                    <div className="notification-icon">
                      <div>
                        <TbNotification />
                      </div>
                      {notif.unread && <BsDot className="unread-dot" />}
                    </div>
                    <div className="notify-body">
                      <div className="notify-text">
                        <h4>{notif.title}</h4>
                        <p>{notif.message}</p>
                        <span>{notif.time}</span>
                      </div>
                      <div className="notification-actions">
                        <Button text="Review" />
                        <Button
                          text="Mark As Read"
                          classname="transparent-button"
                          onClick={() => markAsRead(notif.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="notification-footer">
            <Button
              text="Mark All as Read"
              classname="transparent-button"
              onClick={markAllAsRead}
            />
            <Button text="See All" classname="transparent-button" />
          </div>
        </div>
      )}
    </div>
  );
}
