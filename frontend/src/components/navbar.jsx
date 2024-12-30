import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from "@/components/ui/button"

export function Navbar_left() {
    const [active, setActive] = useState(null);

    return (
        <div className="fixed top-4 inset-x-0 max-w-4xl mt-7 ml-16 z-50 bg-white shadow-md rounded-full bg-opacity-50 border border-transparent dark:bg-black dark:border-white/[0.2] rounded-tr-none">
            <div className="flex justify-between items-center py-1 px-4">
                <img src="test\Logo.png" alt="Logo" className="h-12 mx-2" // Change h-8 to h-12 for larger size
                    style={{ marginRight: 'auto', marginLeft: '0', alignSelf: 'center' }} // Align to left and center vertically
                />
                <div className="flex flex-1 justify-evenly items-center space-x-2">
                    <Link to="/" className="text-lg font-semibold text-black hover:underline">Home</Link>
                    <ScrollLink to="what-is-navix" smooth={true} duration={500} className="text-lg font-semibold text-black cursor-pointer hover:underline">
                        What is BabyVerse
                    </ScrollLink>
                    <ScrollLink to="why-navix" smooth={true} duration={500} className="text-lg font-semibold text-black cursor-pointer hover:underline">
                        Message
                    </ScrollLink>
                </div>
            </div>
        </div>
    );
}
export function Navbar_right() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const [userName, setUserName] = useState("John Doe"); // Replace with the actual user's name

  return (
    <div className="fixed top-4 right-0 w-auto mt-7 mr-16 z-50 bg-white shadow-md rounded-full bg-opacity-50 border border-transparent dark:bg-black dark:border-white/[0.2] rounded-tl-none min-w-[200px] overflow-hidden">
      <div className="flex justify-between items-center py-1 px-4">
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Hi, {userName}
              </span>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" className="text-sm">
                Sign Up
              </Button>
              <Button
                variant="default"
                className=" bg-primary white"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}