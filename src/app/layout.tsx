import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Download de video do YOUTUBE",
  description:
    "Baixe vídeos do youtube na melhor qualidade gratuitamente @rdscoding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className="w-full h-full">
      <body className={`${inter.className} flex-1 w-full h-full`}>
        {children}
      </body>
    </html>
  );
}
