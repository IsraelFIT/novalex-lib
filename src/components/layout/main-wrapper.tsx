"use client";

import useInvalidPaths from "@/hooks/invalid-paths";
import { ReactNode } from "react";

type MainWrapperProps = {
  children: ReactNode;
};

export default function MainWrapper({ children }: MainWrapperProps) {
  const isInvalidPath = useInvalidPaths();

  return <main className={isInvalidPath ? "mt-0" : ""}>{children}</main>;
}
