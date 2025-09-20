import Sidebar from "@/components/Sidebar/Sidebar";
import "./globals.scss";
import localFont from "next/font/local";
import MeasureWidth from "@/components/MeasureWidth/MeasureWidth";

const helvetic = localFont({
  src: [
    { path: "./../fonts/helveticanow.woff2", weight: "100 900", style: "normal" },
    { path: "./../fonts/helveticanowitalic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--helvetic",
});

export const metadata = { title: "Enagram", description: "App description" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className={helvetic.variable}><MeasureWidth />
        <Sidebar />
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
