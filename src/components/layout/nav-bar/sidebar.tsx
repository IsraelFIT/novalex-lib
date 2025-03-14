"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  PiArrowsInLight,
  PiArrowsOutLight,
  PiBooksDuotone,
} from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import UserWidget from "@/components/base/widgets";
import ThemeButton from "@/components/base/button/theme-btn";
import { useSidebarStore } from "@/store/sidebarStore";
import { ImLibrary } from "react-icons/im";
import { HiOutlineUsers } from "react-icons/hi";
import { GiBackForth } from "react-icons/gi";
import { useAuthStore } from "@/store/useAuthStore";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <ImLibrary />,
    name: "Library",
    path: "/library",
  },
  {
    icon: <PiBooksDuotone />,
    name: "Books",
    path: "/library/books",
  },
  {
    icon: <HiOutlineUsers />,
    name: "Users",
    path: "/library/users",
  },
];

const manageItems: NavItem[] = [
  {
    icon: <GiBackForth />,
    name: "Circulation",
    path: "/library/circulation",
  },
  {
    icon: <FiSettings />,
    name: "Settings",
    path: "/library/settings",
  },
];

const Sidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleSidebar,
    toggleMobileSidebar,
    setSelectedPageName,
  } = useSidebarStore();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const isActive = (path: string) => path === pathname;

  const handleToggle = () => {
    if (window.innerWidth >= 991) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const handlePageSelect = (name: string) => {
    setSelectedPageName(name); // Update the selected page name in the store
  };

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav) => {
        // Conditionally render the "Users" tab based on the user's role
        if (nav.name === "Users" && user?.role === "Reader") {
          return null;
        }
        return (
          <li key={nav.name}>
            <Link
              href={nav.path}
              className={`menu-item group ${
                isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
              }`}
              onClick={() => handlePageSelect(nav.name)} // Update the page name when a page is selected
            >
              <span
                className={`${
                  isActive(nav.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className={`menu-item-text`}>{nav.name}</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-black-light dark:border-black-light-hover text-gray-900 h-screen ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`hidden h-20 py-3 lg:py-5 px-5 border border-transparent border-b-gray-200 dark:border-b-black-light-hover w-full items-center lg:flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-between"
        }`}
      >
        {/* Logo */}
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden w-36"
                src="/logo-dark.png"
                alt="NovaLex Logo"
                width={250}
                height={60}
              />
              <Image
                className="hidden dark:block w-36"
                src="/logo-white.png"
                alt="NovaLex Logo"
                width={250}
                height={60}
              />
            </>
          ) : (
            <div className="mobile-logo flex justify-center items-center w-full h-[49px]">
              <Image
                src="/site-icon-dark.png"
                className="w-full dark:hidden"
                alt="NovaLex Logo"
                width={250}
                height={60}
              />
              <Image
                className="hidden dark:block w-full"
                src="/site-icon-white.png"
                alt="NovaLex Logo"
                width={250}
                height={60}
              />
            </div>
          )}
        </Link>
        {/* Toggle Sidebar Button (Visible when Expanded and Not on Mobile) */}
        {isExpanded && !isMobileOpen && (
          <button
            className="items-center justify-center w-10 h-10 text-black-light z-9999 lg:flex dark:text-gray-400 lg:h-11 lg:w-11"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? (
              <PiArrowsInLight className="text-2xl stroke-2" />
            ) : (
              <PiArrowsOutLight className="text-2xl stroke-2" />
            )}
          </button>
        )}
      </div>
      <div className="h-screen flex flex-col justify-between overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col">
            <div className="px-5 py-4 border border-transparent border-b-gray-200 dark:border-b-black-light-hover">
              <h2
                className={`mb-4 text-sm font-medium flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "General" : "..."}
              </h2>
              {renderMenuItems(navItems)}
            </div>

            <div className="px-5 py-4">
              <h2
                className={`mb-4 text-sm font-medium flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Manage App" : "..."}
              </h2>
              {renderMenuItems(manageItems)}
            </div>
          </div>
        </nav>

        <div className="sidebar-foot">
          {/* Theme Toggle Button */}
          {isExpanded || isHovered || isMobileOpen ? <ThemeButton /> : null}

          {/* User Widget */}
          {isExpanded || isHovered || isMobileOpen ? <UserWidget /> : null}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
