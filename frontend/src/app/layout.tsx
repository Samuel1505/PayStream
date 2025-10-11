import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "PayRoll - Revolutionize Your PayRoll with Crypto",
  description: "PayRoll offers a seamless, cost-effective for businesses to disburse salaries directly to employees' crypto wallets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}