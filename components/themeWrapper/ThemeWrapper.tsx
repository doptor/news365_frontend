"use client";

import { ThemeProvider } from "next-themes";

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
