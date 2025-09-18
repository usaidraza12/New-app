
import "./globals.css";
import Navbar from "./home/home";
import Footer from "./home/footer";
import { Providers } from "./context/Provider";
export const metadata = {
  title: "My App",
  description: "Next.js App with Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Navbar /> 

          {children}
        <Footer />

        </Providers>
      </body>
    </html>
  );
}
