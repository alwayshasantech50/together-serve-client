import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TogetherServe",
  description:
    "Discover local events, join community service, and make a difference together.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-base-100 font-sans text-base-content">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;