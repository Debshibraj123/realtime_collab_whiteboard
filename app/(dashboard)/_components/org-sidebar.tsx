"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { LayoutDashboard, Star } from "lucide-react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="hidden lg:flex ml-0 flex-col space-y-6 w-[290px] p-6 bg-gray-50 border-r border-gray-200 h-screen transition-all duration-300 ease-in-out">
      <Link href="/" className="flex items-center gap-x-2 transition-transform duration-300 ease-in-out transform hover:scale-105">
        <Image
          src="/jiro.webp"
          alt="Logo"
          height={60}
          width={60}
          className="rounded-full shadow-md"
        />
        <span className={cn(
          "font-semibold text-2xl text-gray-800",
          font.className,
        )}>
          Board
        </span>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#F3F4F6",
                borderColor: "#D1D5DB",
              },
            }
          }
        }}
      />
      <div className="space-y-2 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className={cn(
            "font-normal justify-start px-4 w-full transition-all duration-300 ease-in-out",
            !favorites && "bg-white hover:bg-gray-100 shadow-sm"
          )}
        >
          <Link href="/">
            <LayoutDashboard className="h-5 w-5 mr-3 text-blue-600" />
            Team boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className={cn(
            "font-normal justify-start px-4 w-full transition-all duration-300 ease-in-out",
            favorites && "bg-white hover:bg-gray-100 shadow-sm"
          )}
        >
          <Link href={{
            pathname: "/",
            query: { favorites: true }
          }}>
            <Star className="h-5 w-5 mr-3 text-yellow-500" />
            Favorite boards
          </Link>
        </Button>
      </div>
      <div 
        className="mt-auto p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3 className="font-semibold mb-2">Pro Tip</h3>
        <p className="text-sm opacity-90">
          {isHovered ? "Click to learn more!" : "Hover for a random tip..."}
        </p>
      </div>
    </div>
  );
};

export default OrgSidebar;