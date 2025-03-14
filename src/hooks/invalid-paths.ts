"use client";

import { usePathname } from "next/navigation";

export default function useInvalidPaths() {
  const pathName = usePathname();

  const invalidPaths = ["/library"];

  const isInvalid = invalidPaths.some((path) => pathName.includes(path));

  return isInvalid;
}
