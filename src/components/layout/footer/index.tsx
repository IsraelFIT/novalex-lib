"use client";

import { useEffect, useState } from "react";
import "./style.css";
import useInvalidPaths from "@/hooks/invalid-paths";

const Footer: React.FC = () => {
  const invalidPath: boolean = useInvalidPaths();
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
  }, []);

  if (invalidPath) return null;
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="f-copyright">
          <p>&copy; NovaLex {year}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
