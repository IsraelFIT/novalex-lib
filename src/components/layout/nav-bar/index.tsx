"use client";

import "./style.css";
import Image from "next/image";
import Link from "next/link";
import useInvalidPaths from "@/hooks/invalid-paths";

const NavBar = () => {
  const invalidPath: boolean = useInvalidPaths();

  if (invalidPath) return null;

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo Section */}
        <div className="logo">
          <Link href="/" passHref>
            <Image
              className="dark:hidden"
              src="/logo-dark.png"
              alt="NovaLex Logo"
              width={1500}
              height={1500}
              priority
            />
            <Image
              className="hidden dark:block"
              src="/logo-white.png"
              alt="NovaLex Logo"
              width={1500}
              height={1500}
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
