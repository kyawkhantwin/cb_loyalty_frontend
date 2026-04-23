import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";
import { Bell } from "lucide-react";
import { Sidebar } from "@/shared/components/Sidebar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoyaltyOS | Admin",
  description: "Advanced loyalty and wallet management system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}  data-theme="dark">
      <body className="min-h-full bg-background text-foreground">
      <Providers>
       <div className="flex flex-1 w-full justify-between">
         <Sidebar />

         <div className="flex-1 w-full  ">
           <header className="h-20 border-b backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
             <div className="font-medium">Welcome back, <span className="font-bold">Admin</span> 👋</div>
             <div className="flex items-center gap-4">
               <div className="relative p-2 rounded-xl cursor-pointer border transition-colors">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 rounded-full border-2"></span>
               </div>
               <div className="h-10 w-[1px] border-r mx-2"></div>
               <div className="flex items-center gap-3 cursor-pointer group">
                 <div className="text-right">
                   <p className="text-sm font-bold transition-colors">Super Admin</p>
                   <p className="text-xs">System Manager</p>
                 </div>
               </div>
             </div>
           </header>
           <main className="p-8 w-full">
             {children}
           </main>
         </div>

       </div>
      </Providers>
      </body>
      </html>
  );
}
