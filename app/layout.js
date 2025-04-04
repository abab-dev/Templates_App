import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import Provider from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
        <ClerkProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
            <Provider>
              <div>{children}</div>
            </Provider>
            {/* <Toaster/> */}
   
      </body>
      </ClerkProvider>
    </html>
  );
}
