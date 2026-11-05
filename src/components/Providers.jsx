"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
      <Toaster position="top-center" />
    </ThemeProvider>
  );
};

export default Providers;