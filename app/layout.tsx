import type { Metadata } from "next";
import '../assets/styles/globales.scss';
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: "CLF - Recruitment task",
  description: "Recruitment task for the Coraz Lepsza Firma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
