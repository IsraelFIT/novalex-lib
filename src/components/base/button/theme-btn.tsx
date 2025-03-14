"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={() => setTheme(mounted && theme === "dark" ? "light" : "dark")}
        className="relative flex items-center w-1/2 lg:w-[70%] h-9 lg:h-12 px-1 py-1.5 lg:py-1 bg-gray-200 rounded-lg lg:rounded-xl dark:bg-black"
      >
        <span
          className={`absolute w-1/2 h-[85%] bg-white dark:bg-black-light-hover rounded-md lg:rounded-lg transform transition-transform ${
            mounted && theme === "dark"
              ? "translate-x-[85%] lg:translate-x-[90%]"
              : "translate-x-0"
          }`}
        ></span>
        <div className="w-1/2 h-full flex items-center justify-center z-10">
          <FiSun className="w-4 h-4 text-black dark:text-gray" />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center z-10">
          <FiMoon className="w-5 h-5 text-gray dark:text-gray-300" />
        </div>
      </button>
    </div>
  );
};

export default ThemeButton;
