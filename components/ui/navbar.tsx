import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="text-white hover:bg-purple-600">
            Home
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600">
            About
          </Button>
          <Button variant="ghost" className="text-white hover:bg-purple-600">
            Contact
          </Button>
    </nav>
  );
}

export { Navbar };
