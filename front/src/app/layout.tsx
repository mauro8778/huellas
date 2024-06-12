import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import metadata from "@/app/metadata";
import HiddenNavBar from "@/components/hidden_navbar/HiddenNavBar";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import { DonationsProvider } from "./context/DonationsContext";


const inter = Inter({ subsets: ["latin"] });

export const metadataa = metadata;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <title>{String(metadata.title) || "Título por defecto"}</title>
        <meta name="description" content={String(metadata.description) || "Descripción por defecto"} />
      </head>
      <body className={inter.className}>
        
      <DonationsProvider> 
        <HiddenNavBar> 
          <Navbar/>
        </HiddenNavBar>
        {children}
        <Footer/>
        </DonationsProvider>
      </body>
    </html>
  );
}
