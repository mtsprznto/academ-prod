"use client"
import { BellRing, LogIn, Search } from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/clerk-react";

export function Navbar() {
  return (
    <div className="flex justify-between p-4 border-b bg-white h-16">
      <SidebarTrigger className="cursor-pointer"></SidebarTrigger>
      <div className="flex gap-4 items-center">
        <div className="flex w-full max-w-sm items-center border-gray-300 rounded-lg px-2.5 py-0.5">
          <Search className="h-4 w-4 mr-2.5 cursor-pointer"></Search>
          <Input
            type="search"
            placeholder="Search"
            className="w-full border-0"
          ></Input>
        </div>

        <Button variant={"outline"} className="cursor-pointer">
          <BellRing className="w-4 h-4 cursor-pointer"></BellRing>
        </Button>

        <SignedOut>
            <SignInButton>
                <Button>
                    <LogIn>
                        Login
                    </LogIn>
                </Button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton></UserButton>
        </SignedIn>
      </div>
    </div>
  );
}
